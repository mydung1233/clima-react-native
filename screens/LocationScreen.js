import React, { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import WeatherModel from '../services/weather';
import { WeatherContext } from '../WeatherContext';

const model = new WeatherModel();

export default function LocationScreen({ navigation }) {
  const { weather, setWeather } = useContext(WeatherContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!weather) return null;

  // Cập nhật theo vị trí GPS hiện tại
  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      setWeather(await model.getLocationWeather());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hàng nút: vị trí hiện tại và tìm thành phố */}
      <View style={styles.topRow}>
        <Pressable onPress={refresh} style={styles.iconButton}>
          <Ionicons name="navigate" size={36} color="#fff" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('City')} style={styles.iconButton}>
          <Ionicons name="business" size={36} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.center}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.tempRow}>
            <Text style={styles.temp}>{weather.temperature}°</Text>
            <Text style={styles.icon}>{model.getWeatherIcon(weather.condition)}</Text>
          </View>
        )}
        <Text style={styles.description}>{weather.description}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <Text style={styles.message}>
        {model.getMessage(weather.temperature)} tại {weather.cityName}!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3A5C',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: 90,
    fontWeight: '300',
    color: '#fff',
  },
  icon: {
    fontSize: 80,
    marginLeft: 8,
  },
  description: {
    fontSize: 20,
    color: '#B0BEC5',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  error: {
    color: '#FFAB91',
    marginTop: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 40,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 12,
  },
});
