import * as Location from 'expo-location';

// Tương đương location.dart (geolocator): lấy vị trí GPS của thiết bị
export default class DeviceLocation {
  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }

  async getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Bạn chưa cấp quyền truy cập vị trí cho ứng dụng');
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }
}
