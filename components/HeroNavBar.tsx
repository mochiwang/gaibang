import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type HeroNavBarProps = {
  onMenuOpen: () => void;
  variant?: 'home' | 'normal';
};

export default function HeroNavBar({ onMenuOpen }: HeroNavBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>该帮</Text>

      <TouchableOpacity onPress={onMenuOpen}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000', // ✅ 改为纯黑
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  menuIcon: {
    fontSize: 28,
    color: 'white',
  },
});
