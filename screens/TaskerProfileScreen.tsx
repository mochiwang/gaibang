import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { supabase } from '../lib/supabase';

type Tasker = {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  service_type: string;
  hourly_rate: number;
  bio?: string;
  experience_years?: number;
  tools?: string;
  languages?: string;
  min_hours?: number;
  photos?: string[]; // 你可以把这改为 JSON 数组字段
};

export default function TaskerProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { taskerId } = route.params as { taskerId: string };

  const [tasker, setTasker] = useState<Tasker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasker = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('taskers')
        .select('*')
        .eq('id', taskerId)
        .single();

      if (error) {
        console.error('❌ 加载失败:', error.message);
      } else {
        setTasker(data);
      }
      setLoading(false);
    };

    fetchTasker();
  }, [taskerId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!tasker) {
    return (
      <View style={styles.centered}>
        <Text>未找到该服务者。</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {tasker.avatar_url && (
        <Image source={{ uri: tasker.avatar_url }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{tasker.name || '未命名'}</Text>
      <Text style={styles.label}>服务类型：{tasker.service_type}</Text>
      <Text style={styles.label}>时薪：${tasker.hourly_rate} / 小时</Text>
      {tasker.experience_years && (
        <Text style={styles.label}>经验年限：{tasker.experience_years} 年</Text>
      )}
      {tasker.bio && <Text style={styles.bio}>{tasker.bio}</Text>}
      {tasker.tools && <Text style={styles.label}>工具：{tasker.tools}</Text>}
      {tasker.languages && <Text style={styles.label}>语言：{tasker.languages}</Text>}
      {tasker.min_hours && (
        <Text style={styles.label}>最少预订时间：{tasker.min_hours} 小时</Text>
      )}

      {/* TODO: 展示照片 */}
      {tasker.photos && tasker.photos.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>服务照片：</Text>
          {tasker.photos.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.photo} />
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('Chat', { taskerId: tasker.id })}
      >
        <Text style={styles.chatButtonText}>💬 聊天</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  bio: {
    fontSize: 15,
    color: '#555',
    marginTop: 10,
    lineHeight: 22,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  chatButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
