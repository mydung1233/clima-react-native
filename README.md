# 🌤 Clima - Ứng dụng thời tiết (React Native + Expo)

Ứng dụng thời tiết sử dụng API của [OpenWeatherMap](https://openweathermap.org/api), được chuyển từ bài Lab 9 Flutter sang **React Native (Expo)** cho môn Lập trình đa nền tảng. Hiển thị thời tiết theo vị trí GPS hoặc theo tên thành phố người dùng nhập.

🎥 **Video demo:** [Dán link video demo vào đây](https://example.com)

## 📸 Ảnh chụp màn hình

| Thời tiết hiện tại | Tìm thành phố |
|---|---|
| ![Weather](screenshots/weather.png) | ![City](screenshots/city.png) |

> Chụp màn hình app rồi lưu vào thư mục `screenshots/`.

## ✨ Chức năng

- Khi mở app, lấy vị trí GPS (`expo-location`) rồi gọi API để lấy thời tiết tại vị trí đó.
- Hiển thị nhiệt độ, mô tả thời tiết, tên thành phố và lời nhắn theo nhiệt độ.
- Biểu tượng thời tiết thay đổi theo mã điều kiện (`weather[0].id`) mà API trả về.
- Nút định vị: cập nhật lại theo vị trí hiện tại.
- Nút thành phố: nhập tên thành phố để xem thời tiết nơi đó, báo lỗi nếu không tìm thấy.
- Có màn hình chờ và xử lý lỗi (không cấp quyền vị trí, mất mạng, sai API key).

## 🔑 Cấu hình API key

1. Đăng ký tài khoản miễn phí tại [openweathermap.org](https://openweathermap.org/api) và lấy API key (key mới có thể mất từ vài phút đến vài giờ để kích hoạt).
2. Trong thư mục dự án, đổi tên `.env.example` thành `.env` rồi dán key vào:

   ```
   EXPO_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. Chạy lại app với cache sạch: `npx expo start -c`.

> File `.env` đã được thêm vào `.gitignore`, **không đẩy API key lên GitHub**.

## 🛠 Công nghệ sử dụng

- [React Native](https://reactnative.dev/), [Expo SDK](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) (native stack)
- `expo-location` (lấy vị trí GPS)
- `fetch` (gọi API), `@expo/vector-icons`

## 📁 Cấu trúc thư mục

```
Clima/
├── screens/
│   ├── LoadingScreen.js    (màn hình chờ, lấy vị trí)
│   ├── LocationScreen.js   (màn hình thời tiết chính)
│   └── CityScreen.js       (tìm theo thành phố)
├── services/
│   ├── location.js         (lấy vị trí GPS)
│   ├── networking.js       (gọi API, xử lý lỗi)
│   └── weather.js          (WeatherModel: biểu tượng, lời nhắn, parse JSON)
├── screenshots/
├── App.js
├── WeatherContext.js
├── .env.example
├── app.json
├── package.json
└── README.md
```

## 🚀 Cài đặt và chạy

**Yêu cầu:** Node.js 18 trở lên, ứng dụng **Expo Go** trên điện thoại (hoặc emulator).

```bash
# 1. Clone dự án
git clone https://github.com/<username>/<repo>.git
cd <repo>

# 2. Cài thư viện
npm install

# 3. Tạo file .env chứa API key (xem mục Cấu hình API key)

# 4. Chạy ứng dụng
npx expo start -c
```

Sau đó quét mã QR bằng Expo Go, hoặc nhấn `a` (Android), `i` (iOS), `w` (web).

## 🔄 So sánh Flutter và React Native

| Flutter | React Native |
|---|---|
| `http` package | `fetch` có sẵn |
| `geolocator` | `expo-location` |
| `jsonDecode` | `response.json()` |
| `location.dart`, `networking.dart`, `weather_model.dart` | `services/location.js`, `networking.js`, `weather.js` |
| `initState()` + `async/await` | `useEffect` + `async/await` |
| `Navigator.push/pop` + giá trị trả về | `navigation.navigate/goBack` + `Context` để chia sẻ dữ liệu |
| `TextField` | `TextInput` |
| `IconButton` | `Pressable` + `Ionicons` |
| `flutter_spinkit` | `ActivityIndicator` |
| `pubspec.yaml` | `package.json` + file `.env` cho API key |

## 👤 Tác giả

- Họ tên: _Nguyễn Văn A_
- MSSV: _12345678_
- Lớp: _..._
- Môn học: Lập trình đa nền tảng
