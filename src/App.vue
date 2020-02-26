<template>
  <div id="app">
    <!-- 总组件 -->
    <Bill></Bill>
  </div>
</template>

<script>
import Bill from '@/components/Bill.vue'
export default {
  name: 'App',
  components: {
    Bill
  }
}
</script>

<style lang="scss">
#app{
  padding: 100px;
}
</style>
