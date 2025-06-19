import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// props 类型定义
type Props = {
  defaultAddress: string; // ✅ 加这一行
  onNext: (address: string) => void;
};


export default function Step4_Address({ onNext }: Props) {
  const [address, setAddress] = useState('');

  const handleNext = () => {
    if (!address.trim()) {
      Alert.alert('请输入地址');
      return;
    }
    onNext(address);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>服务地址</Text>
      <Text style={styles.subtitle}>请输入你服务的主要位置（用于附近任务匹配）</Text>

      <TextInput
        style={styles.input}
        placeholder="例如：123 Main St, Oakland, CA"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>下一步</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007b7f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
