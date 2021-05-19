<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>城市名称</span>
        <el-button class="button" type="text">操作按钮</el-button>
      </div>
    </template>
    <div>
      <el-row :gutter="40">
        <el-col :span="12">
          <div>温度：XX</div>
        </el-col>
        <el-col :span="12">
          <div>天气：XX</div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script lang="ts">
  export default {
    name: 'city',
    setup() {

    }
  }
</script>

<style scoped>
  .box-card {
    width: 300px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
