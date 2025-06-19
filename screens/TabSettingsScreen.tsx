import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { useUserStore } from '../store/useUserStore';
import { supabase } from '../lib/supabase';

export default function TabSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigation.navigate('Login');
  };

  const menuList = [
    { label: 'Account', onPress: () => {}, disabled: true },
    { label: 'Account Security', onPress: () => {}, disabled: true },
    { label: 'Change Password', onPress: () => {}, disabled: true },
    { label: 'Payment', onPress: () => {}, disabled: true },
    { label: 'Promos', onPress: () => {}, disabled: true },
    { label: 'Notifications', onPress: () => {}, disabled: true },
    { label: 'Support', onPress: () => {}, disabled: true },
    { label: 'About', onPress: () => {}, disabled: true },
  ];

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.guestText}>请先登录后查看设置页面</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>立即登录</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 顶部头像 */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=7' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.email?.split('@')[0]}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* 功能菜单 */}
      <View style={styles.menu}>
        {menuList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            disabled={item.disabled}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 成为服务者 */}
      <TouchableOpacity
        style={styles.cta}
        onPress={() => navigation.navigate('TaskerRegisterFlow')}
      >
        <Text style={styles.ctaText}>🧰 Become a Tasker</Text>
      </TouchableOpacity>

      {/* 退出登录 */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  menu: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  cta: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007b7f',
  },
  logout: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    color: '#d00',
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  guestText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: '#008060',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
});
