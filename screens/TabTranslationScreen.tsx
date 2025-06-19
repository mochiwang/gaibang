import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../types';
import HeroNavBar from '../components/HeroNavBar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useUserStore } from '../store/useUserStore';

const screenHeight = Dimensions.get('window').height;

export default function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animValue] = useState(new Animated.Value(-screenHeight));
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(animValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(animValue, {
      toValue: -screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Landing');
  };

  const handleSwitchRole = () => {
    if (!user) return;
    const newRole = user.role === 'client' ? 'tasker' : 'client';
    setUser({ ...user, role: newRole });
  };

  const menuItems = user
    ? user.role === 'client'
      ? [
          { label: '📋 我的任务', action: () => console.log('查看任务') },
          { label: '📊 翻译 / AI 用量', action: () => console.log('查看用量') },
          { label: '🔁 切换为服务者', action: handleSwitchRole },
          { label: '🚪 退出登录', action: handleLogout },
        ]
      : [
          { label: '📍 可抢任务', action: () => console.log('可抢任务') },
          { label: '⚙️ 编辑专业 & 时薪', action: () => console.log('编辑专业') },
          { label: '🔁 切换为客户', action: handleSwitchRole },
          { label: '🚪 退出登录', action: handleLogout },
        ]
    : [
        { label: '开始翻译', action: () => navigation.navigate('WhispererScreen') },
        { label: '登录 / 注册', action: () => navigation.navigate('Login') },
        { label: '帮助', action: () => console.log('Help clicked') },
      ];

  return (
    <SafeAreaView style={styles.container}>
      <HeroNavBar onMenuOpen={openMenu} variant="home" />

      {menuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[styles.overlay, { transform: [{ translateY: animValue }] }]}>
            <View style={styles.menuList}>
              {menuItems.map((item, index) => {
                const fadeAnim = new Animated.Value(0);
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 400,
                  delay: index * 150,
                  useNativeDriver: true,
                }).start();

                return (
                  <Animated.View key={index} style={{ opacity: fadeAnim }}>
                    <TouchableOpacity
                      onPress={() => {
                        item.action();
                        closeMenu();
                      }}
                      style={styles.menuItem}
                    >
                      <Text style={styles.menuText}>{item.label}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}

      <HeroSection />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: screenHeight,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  menuList: {
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  menuText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '500',
  },
});
