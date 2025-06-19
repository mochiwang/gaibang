import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';

type Props = {
  taskerInfo: {
    service_type: string;
    hourly_rate: number;
    bio: string;
    address: string;
  };
  onSubmitSuccess: () => void;
};

export default function Step5_ConfirmAndSubmit({ taskerInfo, onSubmitSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const getCoordinatesFromAddress = async (address: string) => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.warn('❌ 地址解析失败:', data.status);
        return null;
      }
    } catch (error) {
      console.error('❌ 地址请求失败:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      Alert.alert('请先登录');
      return;
    }

    setLoading(true);

    // 1️⃣ 地址转坐标
    const coords = await getCoordinatesFromAddress(taskerInfo.address);
    if (!coords) {
      setLoading(false);
      Alert.alert('地址无效', '无法识别你输入的地址，请重新输入');
      return;
    }

    const { lat, lng } = coords;

    // 2️⃣ 插入 Supabase
    const { error } = await supabase.from('taskers').insert([
      {
        user_id: user.id,
        service_type: taskerInfo.service_type,
        hourly_rate: taskerInfo.hourly_rate,
        bio: taskerInfo.bio,
        address: taskerInfo.address,
        latitude: lat,
        longitude: lng,
        location: `POINT(${lng} ${lat})`,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('❌ 提交失败：', error.message);
      Alert.alert('提交失败', error.message);
    } else {
      Alert.alert('注册成功', '你的服务信息已发布', [{ text: '好的', onPress: onSubmitSuccess }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>确认你的服务信息</Text>

      <View style={styles.card}>
        <Text style={styles.label}>服务类型：</Text>
        <Text style={styles.value}>{taskerInfo.service_type}</Text>

        <Text style={styles.label}>时薪：</Text>
        <Text style={styles.value}>${taskerInfo.hourly_rate}/小时</Text>

        <Text style={styles.label}>服务介绍：</Text>
        <Text style={styles.value}>{taskerInfo.bio || '（无）'}</Text>

        <Text style={styles.label}>服务地址：</Text>
        <Text style={styles.value}>{taskerInfo.address || '（无）'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>提交注册</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  card: {
    backgroundColor: '#f6f6f6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: { fontSize: 16, fontWeight: '500', marginTop: 10, color: '#555' },
  value: { fontSize: 17, color: '#222', marginTop: 4 },
  button: {
    backgroundColor: '#007b7f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
