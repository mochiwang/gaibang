import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
// import { startMicStream } from '../utils/startMicStream';
// import { connectToGaibangBackend } from '../utils/connectToGaibangBackend'; // ✅ 暂时注释掉语音模块

export default function WhispererScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const [translated, setTranslated] = useState<string[]>([]);

  useEffect(() => {
    // ✅ 使用 mock 文本模拟输入，测试链路
    const mockInput = async () => {
      const text = 'Jarvis, what is he saying?';
      setLogs((prev) => [...prev, text]);

      // 翻译
      const res = await fetch('https://gaibang-backend.onrender.com/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setTranslated((prev) => [...prev, data.translation]);

      // 检测 Jarvis 唤醒词 → GPT 总结
      if (text.toLowerCase().includes('jarvis') || text.includes('贾维斯')) {
        const recent = [...logs.slice(-3), text];
        try {
          const gptRes = await fetch('https://gaibang-backend.onrender.com/api/summarizeRecent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recentTexts: recent }),
          });
          const gptData = await gptRes.json();
          console.log('🧠 GPT 总结:', gptData.summary);
          Speech.speak(gptData.summary, { language: 'zh-CN' });
        } catch (e) {
          console.error('GPT 接口出错', e);
        }
      }
    };

    mockInput();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎧 正在模拟监听...</Text>

      <Text style={styles.sectionTitle}>英文识别记录：</Text>
      {logs.map((line, idx) => (
        <Text key={idx} style={styles.logText}>{line}</Text>
      ))}

      <Text style={styles.sectionTitle}>中文翻译结果：</Text>
      {translated.map((line, idx) => (
        <Text key={idx} style={styles.translationText}>{line}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0d0c0f' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  sectionTitle: { fontSize: 18, color: '#bbb', marginTop: 24, marginBottom: 8 },
  logText: { color: '#fff', fontSize: 16, marginBottom: 4 },
  translationText: { color: '#90ee90', fontSize: 16, marginBottom: 4 },
});
