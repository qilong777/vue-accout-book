import Vue from 'vue'
import App from './App.vue'
import {
  Table, TableColumn,
  Message,
  Select, Option,
  Button,
  Dialog,
  Input,
  MessageBox
} from 'element-ui'

Vue.use(Table).use(TableColumn)
  .use(Select).use(Option)
  .use(Button)
  .use(Dialog)
  .use(Input)

Vue.component('MessageBox', MessageBox)
Vue.prototype.$msg = Message
Vue.prototype.$confirm = MessageBox
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
