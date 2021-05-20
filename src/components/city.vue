<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <slot>城市</slot>
        <el-button class="button" type="text">操作按钮</el-button>
      </div>
    </template>
    <div>
      <el-form label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="天气：">
              <span>{{weather['text']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="温度：">
              <span>{{weather['temp'] + '°'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风力：">
              <span>{{weather['windScale'] + ' 级'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="气压：">
              <span>{{weather['pressure'] + ' 百帕'}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'city',
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  setup() {
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
</style>
