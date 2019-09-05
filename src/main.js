// 入口js
import Vue from 'vue'
import App from './App'
import {Button} from 'mint-ui'
import router from './router'
import store from './store'
import './mock/mockServer' // 引入mock即可使用mock模拟数据
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'
// 注册全局组件标签
Vue.use(VueLazyload, {
  loading
})
Vue.component(Button.name, Button) // <mt-button>
const vm = new Vue({ // 内部自定义了lazy
  el: '#app',
  render: h => h(App),
  router,
  store
})
