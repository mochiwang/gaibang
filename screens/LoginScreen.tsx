import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useUserStore, UserRole } from '../store/useUserStore';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    setLoading(true);

    try {
      // 1. 登录验证
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        Alert.alert('登录失败', error?.message || '未知错误');
        return;
      }

      const userId = data.user.id;

      // 2. 查询角色（users 表）
      const { data: profile, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      let role = 'client';

      if (!profile || roleError) {
        // ❗ 没有记录则创建默认角色 client
        await supabase.from('users').insert({ id: userId, role: 'client' });
      } else {
        role = profile.role;
      }

      // 3. 存入 Zustand，全局状态改变后 App.tsx 会自动渲染 Drawer 页面
      setUser({
        id: userId,
        email: data.user.email ?? '',
        role: role as UserRole,
      });

      // 4. 延迟弹出“登录成功”提示，确保 UI 已切换
setUser({
  id: userId,
  email: data.user.email ?? '',
  role: role as UserRole,
});

navigation.navigate('Landing' as never); // ✅ 立即跳转回首页
Alert.alert('✅ 登录成功'); // ✅ 紧接着弹出成功提示

    } catch (err) {
      console.error('登录异常', err);
      Alert.alert('登录异常', '请检查网络或稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>测试登录</Text>

      <TextInput
        style={styles.input}
        placeholder="你注册的邮箱"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? '登录中...' : '登录'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
