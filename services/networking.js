// Tương đương networking.dart: gọi API và trả về dữ liệu JSON
export default class NetworkHelper {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    const response = await fetch(this.url);

    if (!response.ok) {
      if (response.status === 404) throw new Error('Không tìm thấy thành phố này');
      if (response.status === 401) {
        throw new Error('API key không hợp lệ hoặc chưa được kích hoạt');
      }
      throw new Error(`Lỗi máy chủ (mã ${response.status})`);
    }

    return await response.json();
  }
}
