import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Category = {
  label: string;
  emoji: string;
};

const categories: Category[] = [
  { label: '清洁', emoji: '🧹' },
  { label: '搬家', emoji: '🚚' },
  { label: '安装', emoji: '🛠️' },
  { label: '家具组装', emoji: '🪑' },
  { label: '维修', emoji: '🔧' },
  { label: '杂物清理', emoji: '🗑️' },
];

export default function ServiceCategoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelect = (category: string) => {
    navigation.navigate('TaskLocation', { serviceId: category });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>你需要什么服务？</Text>

      {categories.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.card}
          onPress={() => handleSelect(item.label)}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 24,
    marginRight: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
});
