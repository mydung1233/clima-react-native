import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './screens/LoadingScreen';
import LocationScreen from './screens/LocationScreen';
import CityScreen from './screens/CityScreen';
import { WeatherContext } from './WeatherContext';

const Stack = createNativeStackNavigator();

export default function App() {
  // Dữ liệu thời tiết dùng chung cho cả 3 màn hình
  const [weather, setWeather] = useState(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="City" component={CityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherContext.Provider>
  );
}
