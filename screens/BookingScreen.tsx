import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';

type BookingRouteProp = {
  params: {
    taskerId: string;
  };
};

export default function BookingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute() as BookingRouteProp;
  const { taskerId } = route.params;

  const user = useUserStore((state) => state.user);
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('请先登录');
      return;
    }

    if (!date || !hours) {
      Alert.alert('请填写所有字段');
      return;
    }

    const hourVal = parseFloat(hours);
    if (isNaN(hourVal)) {
      Alert.alert('服务时长必须是数字');
      return;
    }

    const { error } = await supabase.from('appointments').insert({
      tasker_id: taskerId,
      client_id: user.id,
      date,
      hours: hourVal,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    if (error) {
      Alert.alert('预约失败', error.message);
    } else {
      Alert.alert('预约成功', '我们会通知服务者尽快确认');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>填写预约信息</Text>

      <Text style={styles.label}>服务日期（YYYY-MM-DD）</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-06-20"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>服务时长（小时）</Text>
      <TextInput
        style={styles.input}
        placeholder="2"
        keyboardType="numeric"
        value={hours}
        onChangeText={setHours}
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>✅ 提交预约</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 6 },
  input: {
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
