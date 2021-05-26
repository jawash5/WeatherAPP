import service from "../util/request";
import axios from "axios";

const key = 'b5d7b2b35d56477c9b68c901ae632048'

export function getLocation(cityName) {
  return axios.get(
    'https://geoapi.qweather.com/v2/city/lookup',
    {
      params: {
        location: cityName,
        key: key
      }
    })
}

export function getSaying() {
  return axios.get('https://v1.alapi.cn/api/soul',)
}

export function getWeather(params) {
  return service.request({
    method: 'get',
    url: '/weather/now',
    params
  })
}

export function getWeather3d(params) {
  return service.request({
    method: 'get',
    url: '/weather/3d',
    params
  })
}