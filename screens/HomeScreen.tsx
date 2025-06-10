import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, Alert,
} from 'react-native';
import { useUserStore } from '../store/useUserStore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
const user = useUserStore((state) => state.user);
const reset = useUserStore((state) => state.setUser); // 或自定义 reset
const name = user?.name ?? "匿名用户";
const role = user?.role ?? "client";
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    reset(null);
    setMenuVisible(false);
    navigation.replace('Landing');
  };

  const handleSwitchRole = () => {
    reset(null);
    setMenuVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* 顶部导航 */}
      <View style={styles.navbar}>
        <Text style={styles.title}>该帮首页</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 欢迎区 */}
      <Text style={styles.welcome}>你好，{name} 👋</Text>
      <Text style={styles.role}>你当前是：{role === 'client' ? '用户' : '服务者'}</Text>

      {/* 主功能按钮 */}
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('进入翻译功能')}>
        <Text style={styles.buttonText}>🎧 进入实时翻译助手</Text>
      </TouchableOpacity>

      {role === 'client' && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateTask')}>
          <Text style={styles.buttonText}>📝 发布一个任务</Text>
        </TouchableOpacity>
      )}

      {/* 菜单弹窗 */}
      <Modal visible={menuVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>当前身份：{role === 'client' ? '用户' : '服务者'}</Text>

            <TouchableOpacity style={styles.menuItem} onPress={handleSwitchRole}>
              <Text>切换身份</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={{ color: 'red' }}>退出登录</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={{ marginTop: 20, color: '#666' }}>关闭菜单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  welcome: { fontSize: 20, marginBottom: 10 },
  role: { fontSize: 16, color: '#666', marginBottom: 30 },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000077',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  menuItem: {
    paddingVertical: 12,
  },
});
