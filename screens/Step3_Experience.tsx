import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Step3_Experience({ onNext }: { onNext: (bio: string) => void }) {
  const [bio, setBio] = useState('');

  const suggestions = [
    '我是一名经验丰富的搬家师傅，已有5年经验。',
    '我擅长清洁，服务过超过100个客户。',
    '我能快速组装各种家具，也能修理小电器。',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>请简单介绍一下你的服务经验（可选）</Text>

      <View style={styles.suggestionContainer}>
        {suggestions.map((s, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.suggestion}
            onPress={() => setBio(s)}
          >
            <Text style={styles.suggestionText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="请输入一句话介绍，例如：我有3年清洁经验，认真细致。"
        value={bio}
        onChangeText={setBio}
        multiline
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onNext(bio.trim())}
      >
        <Text style={styles.buttonText}>完成</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  suggestionContainer: {
    marginBottom: 20,
  },
  suggestion: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007b7f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
