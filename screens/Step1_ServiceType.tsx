import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

export default function Step1_ServiceType({ onNext }: { onNext: (type: string) => void }) {
  const recommended = ['清洁', '搬家', '安装', '家具组装', '杂物清理', '电器维修'];
  const [customType, setCustomType] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>你想提供什么服务？</Text>

      <View style={styles.tagContainer}>
        {recommended.map((type) => (
          <TouchableOpacity
            key={type}
            style={styles.tag}
            onPress={() => onNext(type)}
          >
            <Text style={styles.tagText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>找不到合适的？你也可以输入自己的服务名称：</Text>

      <TextInput
        placeholder="请输入服务类型，例如：宠物洗澡、拼图课"
        value={customType}
        onChangeText={setCustomType}
        style={styles.input}
        onSubmitEditing={() => {
          if (customType.trim()) {
            onNext(customType.trim());
          }
        }}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => {
          if (customType.trim()) {
            onNext(customType.trim());
          }
        }}
      >
        <Text style={styles.customButtonText}>使用这个服务类型</Text>
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
  subtitle: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#007b7f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f0fdfd',
  },
  tagText: {
    color: '#007b7f',
    fontWeight: '500',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  customButton: {
    marginTop: 20,
    backgroundColor: '#007b7f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  customButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
