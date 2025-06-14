import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';
import type { RootStackParamList } from '../types';

type CreateTaskRouteProp = RouteProp<RootStackParamList, 'CreateTask'>;

const serviceLabels: Record<string, string> = {
  moving: '搬家服务',
  cleaning: '清洁服务',
  handyman: '安装维修',
  furniture: '家具组装',
};

export default function CreateTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute<CreateTaskRouteProp>();
  const { serviceId } = route.params;

  const user = useUserStore((state) => state.user);
  const userId = user?.id;

  const [title, setTitle] = useState(`我需要${serviceLabels[serviceId] || '帮忙'}`);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('请先登录');
      return;
    }

    if (!title || !description || !location || !budget) {
      Alert.alert('请填写所有字段');
      return;
    }

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue)) {
      Alert.alert('预算必须是数字');
      return;
    }

    const { error } = await supabase.from('tasks').insert([
      {
        created_by: userId,
        service_id: serviceId,
        title,
        description,
        location,
        budget: budgetValue,
        status: 'posted',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('❌ 插入失败:', error.message);
      Alert.alert('任务提交失败', error.message);
    } else {
      Alert.alert('✅ 发布成功！', '任务已成功发布，等待服务者接单');
      setTitle('');
      setDescription('');
      setLocation('');
      setBudget('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 发布一个新任务（{serviceLabels[serviceId]}）</Text>

      <TextInput
        style={styles.input}
        placeholder="任务标题（如：帮我搬家）"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="请描述你的需求（如搬什么、地点在哪）"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="地址或地点（如：San Jose）"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="预算金额（如：50）"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>✅ 提交任务</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
