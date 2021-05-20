<template>
  <div class="content">
    <el-input
        style="margin-bottom: 20px"
        v-model="cityName"
        placeholder="请输入城市名称"
        @keydown.enter.native="searchWeather"
        suffix-icon="el-icon-search"></el-input>
    <city :weather="cityWeather">
      <span v-if="conformCityName">{{ conformCityName }}</span>
    </city>
  </div>
</template>

<script lang="ts">
import city from "./components/city.vue";
import {ref} from 'vue'
import {getLocation, getWeather} from "./api/weather.js";
import {ElNotification} from 'element-plus';

export default {
  name: 'App',
  components: {
    city
  },
  setup() {
    const cityName = ref('')
    const cityWeather = ref({
      pressure: "XXXX",
      temp: "XX",
      text: "XX",
      windScale: "X",
    })
    const conformCityName = ref('')

    const searchWeather = () => {
      getLocation(cityName.value)
          .then(res => {
            if (res.data.code !== '200') {
              ElNotification({
                type: 'error',
                title: '错误',
                message: '未找到该地名'
              })
            } else {
              const locationId = res.data.location[0].id
              conformCityName.value = res.data.location[0].name
              getWeather({location: locationId})
                  .then(res2 => {
                    cityWeather.value = res2['now']
                  })
            }
          })
    }
    return {
      cityName,
      cityWeather,
      conformCityName,
      searchWeather
    }
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
