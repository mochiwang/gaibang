import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

const services = [
  { id: 'moving', title: '搬家服务', emoji: '📦' },
  { id: 'cleaning', title: '清洁服务', emoji: '🧹' },
  { id: 'handyman', title: '安装维修', emoji: '🔧' },
  { id: 'furniture', title: '家具组装', emoji: '🪑' },
];

export default function TabMarketScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectService = (serviceId: string) => {
    navigation.navigate('CreateTask', { serviceId });
  };

  return (
    <>
      {/* 锁定 TS 的 JSX 解析，不会把下面的 <SafeAreaView> 当成类型 */}
      <></>

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>请选择你需要的服务：</Text>

        <FlatList
          data={services}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelectService(item.id)}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.label}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#222',
  },
  list: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
