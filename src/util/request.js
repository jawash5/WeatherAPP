import axios from 'axios'

const service = axios.create({
  baseURL: 'https://devapi.qweather.com/v7',
  timeout: 3000
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  const params = config.params
  config.params = {
    ...params,
    key: 'b5d7b2b35d56477c9b68c901ae632048'
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default service;