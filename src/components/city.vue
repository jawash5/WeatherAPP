<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <slot>城市</slot>
        <el-button @click="dialogVisible = true" type="text">操作按钮</el-button>
      </div>
    </template>
    <el-form label-width="auto">
      <el-row :gutter="20">
        <el-col :span="24">
          <span class="saying">每日毒鸡汤：{{ saying }}</span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="天气：">
            <span>{{ weather['text'] }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="温度：">
            <span>{{ weather['temp'] + '°' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="风力：">
            <span>{{ weather['windScale'] + ' 级' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="气压：">
            <span>{{ weather['pressure'] + ' 百帕' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <teleport to="#dialog">
      <el-dialog
          title="天气详情"
          v-model="dialogVisible"
          width="50%">
        <el-form label-width="auto">
          <el-form-item
              v-for="(item,index) in Object.keys(weather).filter(i => i !== 'icon')"
              :key="index"
              :label="weatherMap[item] + '：'">
            {{ weather[item] }}
          </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </template>
      </el-dialog>
    </teleport>
  </el-card>
</template>

<script lang="ts">
import {ref, reactive, toRefs} from "vue";
import {getSaying} from '../api/weather.js'

export default {
  name: 'city',
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  /*
    以下会消除响应式
    setup({weather}) {
      // 但是你可以使用reactive或ref在对非响应式的weather进行包装
      const WeatherData = reactive(weather)
    }
   */
  setup(props) {
    const {weather} = toRefs(props) // 此时weather是个ref对象
    const dialogVisible = ref(false);
    const weatherMap = reactive({
      obsTime: '观测时间',
      temp: "温度（摄氏度）",
      feelsLike: "体感温度（摄氏度）",
      text: "天气状况",
      wind360: "风向360角度",
      windDir: "风向",
      windScale: "风力等级",
      windSpeed: "风速（公里/小时）",
      humidity: "相对湿度（百分比数值）",
      precip: "小时降水量（毫米）",
      pressure: "气压（百帕）",
      vis: "能见度（公里）",
      cloud: "云量",
      dew: "露点温度"
    })
    const saying = ref('')

    const getComment = () => {
      getSaying().then(res => {
        saying.value = res.data.data.title
      })
    }
    getComment()

    return {
      dialogVisible,
      weatherMap,
      saying
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 400px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.saying {
  font-size: 14px;
  opacity: .7;
}
</style>
