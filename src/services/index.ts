import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:5000',
});

export default api;
// 10.0.2.2:PORTA => android
