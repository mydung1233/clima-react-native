import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import WeatherModel from '../services/weather';
import { WeatherContext } from '../WeatherContext';

export default function LoadingScreen({ navigation }) {
  const { weather, setWeather } = useContext(WeatherContext);
  const [error, setError] = useState(null);

  const load = async () => {
    setError(null);
    try {
      const data = await new WeatherModel().getLocationWeather();
      setWeather(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Có dữ liệu (từ GPS hoặc từ màn hình tìm thành phố) thì sang màn hình chính
  useEffect(() => {
    if (weather) navigation.replace('Location');
  }, [weather]);

  return (
    <View style={styles.container}>
      {error ? (
        <>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.button} onPress={load}>
            <Text style={styles.buttonText}>Thử lại</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondary]}
            onPress={() => navigation.navigate('City')}
          >
            <Text style={styles.buttonText}>Nhập tên thành phố</Text>
          </Pressable>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loading}>Đang lấy vị trí và thời tiết...</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3A5C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loading: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  error: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginTop: 10,
  },
  secondary: {
    backgroundColor: '#455A64',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
