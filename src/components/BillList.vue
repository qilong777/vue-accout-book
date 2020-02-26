<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="time"
      label="账单时间"
      width="280">
    </el-table-column>
    <el-table-column
      prop="name"
      label="账单分类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="账单类型">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="账单金额">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'BillList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {

  }
}
</script>

<style lang='scss' scoped>
</style>
