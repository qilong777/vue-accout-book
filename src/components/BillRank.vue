<template>
<div class='bill-rank'>
  <h2>支出排名</h2>
  <div class="btn-box">
    <el-button type="primary" round @click="$emit('changeSortType')">{{sortType===0?'升序':'降序'}}</el-button>
  </div>
  <el-table
    :data="rankList"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="账单分类"
      width="200">
    </el-table-column>
    <el-table-column
      width="200"
      prop="outcome"
      label="总支出金额">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'BillRank',
  props: {
    rankList: {
      type: Array,
      default: () => []
    },
    sortType: Number
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.bill-rank{
  margin-bottom: 50px;
  h2,.btn-box{
    text-align: center;
  }
}
</style>
