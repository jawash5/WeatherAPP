<template>
  <div class="content">
    <el-form ref="form" :model="cityData" :rules="formRules" label-width="auto">
      <el-form-item label="城市名称：" prop="cityName">
        <el-input
            v-model="cityData.cityName"
            placeholder="请输入城市名称"
            @keydown.enter.native.prevent="searchWeather"
            suffix-icon="el-icon-search"></el-input>
      </el-form-item>
    </el-form>
    <suspense v-if="conformCityName">
      <template #default>
        <city :weather="cityWeather">
          <span v-if="conformCityName">{{ conformCityName }}</span>
        </city>
      </template>
      <template #fallback>
        <el-card class="loading" style="width: 400px; height: 240px">
          <div>
            <i class="el-icon-loading"></i>
            组件加载中，请稍后...
          </div>
        </el-card>
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineAsyncComponent, provide} from 'vue'
import {getLocation, getWeather, getWeather3d} from "./api/weather.js";
import {ElNotification} from 'element-plus';

export default {
  name: 'App',
  components: {
    city: defineAsyncComponent(() => import("./components/city.vue"))
  },
  setup() {
    const cityData = reactive({
      cityName: ''
    })
    const cityWeather = ref({
      pressure: "XXXX",
      temp: "XX",
      text: "XX",
      windScale: "X",
    })
    const cityWeather3d = ref({})
    const conformCityName = ref('')

    const validateCity = (rule: object, value: string, callback: (err?: Error) => void) => {
      if (value === '') {
        callback(new Error('请输入城市名称'));
      } else if (/[0-9]/.test(value)) {
        callback(new Error('城市名称中不能包含数字'));
      } else {
        callback()
      }
    };
    const formRules = {
      cityName: [
        {validator: validateCity, trigger: 'blur'}
      ],
    }

    const form = ref(null)

    const searchWeather = () => {
      form.value.validate((valid: boolean) => {
        if (valid) {
          getLocation(cityData.cityName)
              .then(res => {
                if (res.data.code !== '200') {
                  ElNotification({
                    type: 'error',
                    title: '错误',
                    message: '未找到该地名'
                  })
                } else {
                  const locationId: string = res.data.location[0].id
                  conformCityName.value = res.data.location[0].name
                  getWeather({location: locationId})
                      .then(res2 => {
                        cityWeather.value = res2['now']
                        return getWeather3d({location: locationId})
                      })
                      .then(res3 => {
                        cityWeather3d.value = res3['daily']
                      })
                }
              })
        } else {
          return false;
        }
      })
    }

    provide('cityWeather3d', cityWeather3d)

    return {
      cityData,
      cityWeather,
      conformCityName,
      formRules,
      form,
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

.loading {
  width: 400px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
