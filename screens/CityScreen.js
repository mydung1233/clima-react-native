import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import WeatherModel from '../services/weather';
import { WeatherContext } from '../WeatherContext';

export default function CityScreen({ navigation }) {
  const { setWeather } = useContext(WeatherContext);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async () => {
    const name = cityName.trim();
    if (!name) {
      setError('Hãy nhập tên thành phố');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await new WeatherModel().getCityWeather(name);
      setWeather(data);
      navigation.goBack(); // quay lại và hiển thị dữ liệu mới
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="chevron-back" size={36} color="#fff" />
      </Pressable>

      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thành phố (vd: Hanoi)"
          placeholderTextColor="#90A4AE"
          value={cityName}
          onChangeText={setCityName}
          onSubmitEditing={search}
          returnKeyType="search"
          autoCapitalize="words"
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          onPress={search}
          disabled={loading}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Lấy thời tiết</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3A5C',
    padding: 16,
  },
  back: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: '#212121',
  },
  error: {
    color: '#FFAB91',
    marginTop: 12,
    fontSize: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E88E5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
