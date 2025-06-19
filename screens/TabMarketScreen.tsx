import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { supabase } from '../lib/supabase';

type Tasker = {
  id: string;
  name: string;
  avatar_url?: string;
  hourly_rate: number;
  bio: string;
  service_type: string;
  rating?: number;
  review_count?: number;
  task_count?: number;
};

export default function TabMarketScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { serviceId, lat, lng } = route.params as {
    serviceId: string;
    lat?: number;
    lng?: number;
  };

  const [taskers, setTaskers] = useState<Tasker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyTaskers = async () => {
      setLoading(true);
      let data = [];

      if (lat && lng) {
        const result = await supabase.rpc('get_nearby_taskers', {
          service_type_input: serviceId,
          user_lat: lat,
          user_lng: lng,
          radius_meters: 10000,
        });
        if (result.error) {
          console.error('❌ RPC 错误:', result.error.message);
        } else {
          data = result.data;
        }
      } else {
        const result = await supabase
          .from('taskers')
          .select('*')
          .eq('service_type', serviceId);

        if (result.error) {
          console.error('❌ 获取失败:', result.error.message);
        } else {
          data = result.data;
        }
      }

      setTaskers(data as Tasker[]);
      setLoading(false);
    };

    fetchNearbyTaskers();
  }, [serviceId, lat, lng]);

  const handlePress = (tasker: Tasker) => {
    navigation.navigate('TaskerProfile', { taskerId: tasker.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>附近的 {serviceId} 服务者</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#555" />
      ) : (
        <FlatList
          data={taskers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
              <Image
                source={{ uri: item.avatar_url || 'https://i.pravatar.cc/100?img=8' }}
                style={styles.avatar}
              />

              <View style={styles.info}>
                <View style={styles.rowBetween}>
                  <Text style={styles.name}>{item.name || '未命名服务者'}</Text>
                  <Text style={styles.price}>
                    ${item.hourly_rate.toFixed(2)}/hr
                  </Text>
                </View>

                <Text style={styles.meta}>
                  ⭐ {item.rating?.toFixed(1) || '5.0'} ({item.review_count || 0} reviews) · {item.task_count || 0} tasks
                </Text>

                <Text style={styles.bio} numberOfLines={2}>
                  {item.bio || '暂无简介'}
                </Text>

                <Text style={styles.link}>查看资料 →</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007b7f',
  },
  meta: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  bio: {
    marginTop: 6,
    fontSize: 15,
    color: '#333',
  },
  link: {
    marginTop: 6,
    color: '#007b7f',
    fontWeight: '500',
    fontSize: 14,
  },
});
