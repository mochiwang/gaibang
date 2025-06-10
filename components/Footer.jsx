import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function Footer() {
  const links = [
    { label: '关于我们', url: '/about' },
    { label: '联系我们', url: '/contact' },
    { label: '常见问题', url: '/faq' },
    { label: '隐私政策', url: '/privacy' },
  ];

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <Text style={styles.logo}>该帮 GaiBang</Text>

        <View style={styles.links}>
          {links.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(link.url)}>
              <Text style={styles.linkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.copyright}>
        © {new Date().getFullYear()} 该帮 GaiBang. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'black',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  linkText: {
    color: '#ccc',
    fontSize: 14,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
    marginTop: 24,
    marginBottom: 12,
  },
  copyright: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});
