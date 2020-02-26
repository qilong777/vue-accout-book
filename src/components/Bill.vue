<template>
  <div class="bill">
    <div class="show" v-if="month">
      <p>{{monthList[month-1]}}份的收入为{{income}}</p>
      <p>{{monthList[month-1]}}份的支出为{{outcome}}</p>
    </div>
    <hr v-if="month">
    <BillRank @changeSortType="changeSortType" v-if="month" :rankList="rankList" :sortType="sortType"></BillRank>
    <hr>
    <div class="select">
      <span>月份:</span>
      <el-select v-model="month" @change="getList" placeholder="请选择">
        <el-option
          label="所有月份"
          value="">
        </el-option>
        <el-option
          v-for="(item,index) in monthList"
          :key="index"
          :label="item"
          :value="index+1">
        </el-option>
      </el-select>
      <span>类别:</span>
      <el-select v-model="cate"  @change="getBillList" placeholder="请选择">
        <el-option
          label="所有类别"
          value="">
        </el-option>
        <el-option
          v-for="item in cateList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

       <el-button @click="dialogVisible = true" style="marginLeft:15px" type="primary" round>添加</el-button>
    </div>
    <hr>

    <el-dialog
      title="添加账单"
      :visible.sync="dialogVisible"
      width="40%"
    >
    <div class="dialog-row">
      <span>类别: </span>
      <el-select v-model="addCate"  @change="getBillList" placeholder="请选择">
        <el-option
          label="请选择"
          value="">
        </el-option>
        <el-option
          v-for="item in cateList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <!-- <div class="dialog-row">
      <span>类型: </span>
      <el-select v-model="type"  @change="getBillList" placeholder="请选择">
        <el-option
          label="请选择"
          value="">
        </el-option>
        <el-option
          label="收入"
          value="0">
        </el-option>
        <el-option
          label="支出"
          value="1">
        </el-option>
      </el-select>
    </div> -->
    <div class="dialog-row">
      <span>金额: </span>
      <el-input v-model.number="amount" placeholder="请输入金额"></el-input>
    </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk()">确 定</el-button>
      </span>
    </el-dialog>

    <BillList :list="list"></BillList>

  </div>
</template>

<script>
import { getBill, getCate, addBill } from '@/api'
import BillList from '@/components/BillList'
import BillRank from '@/components/BillRank'
export default {
  name: 'Bill',
  data () {
    return {
      // 渲染的数据列表
      list: [],
      // 选择月份的列表
      monthList: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
      month: '',

      // 选择的分类列表
      cateList: [],
      cate: '',

      // 添加的字段
      addCate: '',
      amount: '',

      dialogVisible: false,

      // 收入和支出
      income: 0,
      outcome: 0,

      // 排序列表
      rankList: [],
      // 排序方式,0为升序
      sortType: 0

    }
  },
  methods: {
    // 改变排序方式
    changeSortType () {
      this.sortType = this.sortType === 0 ? 1 : 0
    },
    getList () {
      this.getBillList()
      this.getRankList()
    },
    // 获取账单列表
    async getBillList () {
      try {
        this.list = (await getBill({
          month: this.month,
          needCate: this.cate
        })).list.map(ele => {
          ele.time = (new Date(ele.time - 0)).toLocaleString()
          ele.amount = Number(ele.amount).toFixed(2)
          ele.type = ele.type === '0' ? '收入' : '支出'
          return ele
        })
      } catch (err) {
        this.$msg.error('数据加载失败')
      }
    },
    async getRankList () {
      if (!this.month) {
        return
      }
      try {
        const list = (await getBill({
          month: this.month
        })).list
        const rankList = []
        list.forEach(ele => {
          const index = rankList.findIndex(item => item.category === ele.category)
          const outcome = Number((ele.type === '0') ? (-ele.amount) : ele.amount)
          if (index !== -1) {
            const item = rankList[index]
            item.outcome = (Number(item.outcome) + outcome).toFixed(2)
          } else {
            rankList.push({
              category: ele.category,
              outcome: outcome.toFixed(2),
              name: ele.name
            })
          }
        })
        this.rankList = rankList.sort((a, b) => this.sortType === 0 ? (a - b) : (b - a))

        console.log(rankList)
      } catch (err) {
        this.$msg.error('数据加载失败')
      }
    },
    // 获取类别列表
    async getCateList () {
      try {
        this.cateList = (await getCate()).list
      } catch (err) {
        this.$msg.error('数据加载失败')
      }
    },
    // 添加账单列表
    async addBillList () {
      const data = {
        category: this.addCate,
        amount: this.amount
      }
      try {
        await addBill(data)
        this.getList()
        this.$msg({
          type: 'success',
          message: '添加成功'
        })
      } catch (error) {
        this.$msg({
          type: 'error',
          message: '添加失败'
        })
      }
      this.addCate = ''
      this.amount = ''
    },
    // 处理点击确认添加的函数
    handleOk () {
      this.$confirm('是否添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.addCate || !this.amount) {
          this.$msg({
            type: 'info',
            message: '添加的数据格式错误'
          })
        } else {
          this.dialogVisible = false
          this.addBillList()
        }
      }).catch(() => {
        this.$msg({
          type: 'info',
          message: '已取消添加'
        })
      })
    }
  },
  watch: {
    // 收入和支出
    list: {
      deep: true,
      handler () {
        let income = 0
        let outcome = 0
        this.list.forEach(ele => {
          if (ele.type === '收入') {
            income += Number(ele.amount)
          } else {
            outcome += Number(ele.amount)
          }
        })
        this.income = income
        this.outcome = outcome
      }

    },
    // 排序方式
    sortType () {
      this.rankList = this.rankList.sort((a, b) => this.sortType === 0 ? (a.outcome - b.outcome) : (b.outcome - a.outcome))
    }

  },
  components: {
    BillList,
    BillRank
  },
  created () {
    this.getBillList()
    this.getCateList()
  }
}
</script>

<style lang='scss' scoped>
.dialog-row{
  margin: 10px 0;
  span{
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 5px;
  }
  .el-input{
    width: 200px;
  }
  .el-select{
    width: 200px;
  }
}
</style>
