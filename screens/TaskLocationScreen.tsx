import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!;
const AUTOCOMPLETE_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const DETAILS_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';

type Prediction = {
  description: string;
  place_id: string;
};

export default function TaskLocationScreen() {
  // ---------- 路由 & 参数 ----------
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { serviceId } = (route.params || {}) as { serviceId?: string };

  // ---------- 本地状态 ----------
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------- 请求地址建议 ----------
  const fetchPredictions = async (input: string) => {
    setQuery(input);
    if (!input.trim()) {
      setPredictions([]);
      return;
    }

    try {
      const url = `${AUTOCOMPLETE_URL}?input=${encodeURIComponent(
        input,
      )}&key=${GOOGLE_API_KEY}&language=zh-CN`;
      console.log('🔗 请求 URL:', url);

      const res = await fetch(url);
      const json = await res.json();
      console.log('📦 返回结果:', JSON.stringify(json, null, 2));

      if (json.status === 'OK') {
        setPredictions(json.predictions || []);
      } else {
        console.log('⚠️ Places API status:', json.status);
        setPredictions([]);
      }
    } catch (e) {
      console.log('❌ fetchPredictions error:', e);
    }
  };

  // ---------- 选中建议 ----------
  const handleSelect = async (placeId: string) => {
    try {
      setLoading(true);
      const url = `${DETAILS_URL}?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.status !== 'OK') {
        Alert.alert('地址解析失败', json.status);
        return;
      }

      const { lat, lng } = json.result.geometry.location;
      navigation.navigate('TabMarket', {
        lat,
        lng,
        serviceId: serviceId!, // 已在下方做参数校验
      });
    } catch (e) {
      Alert.alert('网络错误', String(e));
    } finally {
      setLoading(false);
    }
  };

  // ---------- 参数缺失兜底 ----------
  if (!serviceId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.warning}>⚠️ 页面缺少服务类型参数</Text>
      </View>
    );
  }

  // ---------- 组件渲染 ----------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>请输入任务地址</Text>

      <TextInput
        style={styles.input}
        placeholder="如 2302 Valdez Street"
        value={query}
        onChangeText={fetchPredictions}
      />

      <View style={styles.listWrapper}>
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              disabled={loading}
              onPress={() => handleSelect(item.place_id)}
            >
              <Text style={styles.address}>{item.description}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            query ? (
              <Text style={styles.noResult}>没有匹配地址</Text>
            ) : null
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

// ---------- 样式 ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning: { fontSize: 16, color: '#999' },
  title: { fontSize: 20, fontWeight: '500', marginBottom: 16 },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  listWrapper: {
    maxHeight: 260,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  card: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  address: { fontSize: 16 },
  noResult: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
  },
});
