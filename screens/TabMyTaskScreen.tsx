import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';
import { useNavigation } from '@react-navigation/native';

export default function MyTasksScreen() {
  const user = useUserStore((state) => state.user);
  const userId = user?.id;
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ 获取任务失败:', error.message);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.meta}>📍 {item.location} ・ 💰 ${item.budget}</Text>
      <Text style={styles.status}>状态：{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 我的任务</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : tasks.length === 0 ? (
        <Text style={styles.empty}>你还没有发布任何任务。</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={fetchTasks}>
        <Text style={styles.refreshText}>🔄 刷新</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  list: { paddingBottom: 80 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: '600' },
  description: { marginTop: 8, fontSize: 14, color: '#555' },
  meta: { marginTop: 8, fontSize: 13, color: '#777' },
  status: { marginTop: 6, fontSize: 13, color: '#007AFF' },
  empty: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 40 },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshText: { color: '#fff', fontWeight: 'bold' },
});
