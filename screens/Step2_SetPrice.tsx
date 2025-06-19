import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

export default function Step2_SetPrice({ onNext }: { onNext: (price: number) => void }) {
  const [customPrice, setCustomPrice] = useState('');
  const recommendedPrices = [30, 50, 70];

  const handleSubmit = () => {
    const parsed = parseFloat(customPrice);
    if (!isNaN(parsed) && parsed > 0) {
      onNext(parsed);
    } else {
      alert('请输入有效的时薪（数字）');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>你希望每小时收取多少钱？</Text>

      <View style={styles.priceRow}>
        {recommendedPrices.map((price) => (
          <TouchableOpacity
            key={price}
            style={styles.priceTag}
            onPress={() => onNext(price)}
          >
            <Text style={styles.priceText}>${price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>或者自行输入你的时薪：</Text>

      <TextInput
        style={styles.input}
        placeholder="例如：60"
        keyboardType="numeric"
        value={customPrice}
        onChangeText={setCustomPrice}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>确认时薪</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  priceTag: {
    backgroundColor: '#e0f7f7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007b7f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007b7f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
