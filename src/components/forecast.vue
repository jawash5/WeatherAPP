<template>
  <div class="forecast-card">
    <el-row style="margin-bottom: 10px" :gutter="20" v-for="item in cityWeather3d" :key="item['fxDate']">
      <el-col :span="8">
        <span>{{item['fxDate']}}</span>
      </el-col>
      <el-col :span="8">
        <span>{{item['textDay']}}</span>
      </el-col>
      <el-col :span="8">
       <span>{{item['tempMin']}}℃ / {{item['tempMax']}}℃</span>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {inject} from "vue";

export default {
  name: "forecast",
  setup() {
    const cityWeather3d: any = inject('cityWeather3d')

    return {
      cityWeather3d
    }
  }
}
</script>

<style scoped>
.forecast-card {
  font-size: 14px;
}
</style>