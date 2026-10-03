import { createContext } from 'react';

// Chia sẻ dữ liệu thời tiết giữa các màn hình
export const WeatherContext = createContext({
  weather: null,
  setWeather: () => {},
});
