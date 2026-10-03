import NetworkHelper from './networking';
import DeviceLocation from './location';

// API key đọc từ file .env (biến phải bắt đầu bằng EXPO_PUBLIC_)
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Ánh xạ JSON trả về thành đối tượng gọn cho giao diện (weather_model.dart)
const parseWeather = (json) => ({
  temperature: Math.round(json.main.temp),
  condition: json.weather[0].id,
  description: json.weather[0].description,
  cityName: json.name,
});

const checkKey = () => {
  if (!API_KEY) {
    throw new Error(
      'Chưa có API key. Tạo file .env với EXPO_PUBLIC_OPENWEATHER_API_KEY rồi chạy lại: npx expo start -c'
    );
  }
};

export default class WeatherModel {
  async getCityWeather(cityName) {
    checkKey();
    const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=vi`;
    const json = await new NetworkHelper(url).getData();
    return parseWeather(json);
  }

  async getLocationWeather() {
    checkKey();
    const location = new DeviceLocation();
    await location.getCurrentLocation();
    const url = `${BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric&lang=vi`;
    const json = await new NetworkHelper(url).getData();
    return parseWeather(json);
  }

  // Biểu tượng thay đổi theo mã điều kiện thời tiết của OpenWeatherMap
  getWeatherIcon(condition) {
    if (condition < 300) return '🌩';
    if (condition < 400) return '🌧';
    if (condition < 600) return '☔️';
    if (condition < 700) return '☃️';
    if (condition < 800) return '🌫';
    if (condition === 800) return '☀️';
    if (condition <= 804) return '☁️';
    return '🤷‍';
  }

  getMessage(temp) {
    if (temp > 25) return 'Trời nóng, đến giờ ăn 🍦 rồi!';
    if (temp > 20) return 'Mặc 👕 và quần short đi chơi thôi';
    if (temp < 10) return 'Nhớ mang 🧣 và 🧤';
    return 'Mang theo 🧥 phòng khi trời se lạnh';
  }
}
