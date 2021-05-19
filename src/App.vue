<template>
  <div class="content">
    <city></city>
  </div>
</template>

<script lang="ts">
import city from "./components/city.vue";

export default {
  name: 'App',
  components: {
    city
  },
  setup() {

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
