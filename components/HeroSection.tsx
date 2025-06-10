import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeroSection() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/hero-bg.jpg')} // ✅ 请确保图片存在
      style={styles.background}
      resizeMode="cover"
    >
      {/* 半透明遮罩 */}
      <View style={styles.overlay}>
        {/* 主文案内容 */}
        <Text style={styles.title}>欢迎使用「该帮」</Text>
        <Text style={styles.subtitle}>你的新移民好帮手</Text>
        <Text style={styles.description}>
          实用翻译 + AI 助手，帮你应对生活每一个挑战。
          {"\n"}点一下，马上试试！
        </Text>

        {/* 进入 Whisperer 按钮 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WhispererScreen' as never)}
        >
          <Text style={styles.buttonText}>🎷 立即开始翻译</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#eee',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#facc15',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
