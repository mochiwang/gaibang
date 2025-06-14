import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabSettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ 设置页面（TabSettingsScreen）</Text>
      <Text style={styles.subtext}>此页面可用于账号设置、通知、偏好等功能</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
