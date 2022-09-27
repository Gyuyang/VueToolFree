<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <el-button type="primary" @click="GoTest">测试一下吧</el-button>
    <el-button type="primary" @click="GoMessage">弹窗</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { _debounce, loading, confirm } from '@/utils/tools.js'
import { MessageBox, Message } from 'element-ui'
export default {
  name: 'HomeView',
  data(){
    const _this = this
    return {
      Result:1
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    GoTest () {
      return new Promise((resolve, reject) => {
        resolve('123')
      })
    },
    async getDate () {
      try {
        const data = await this.loadData()
        console.log(data, 312)
      } catch (error) {
        console.log(error)
      }
    },
    async loadData () {
      console.log('async1 start')
      return this.async2()
    },
    async async2 () {
      return Promise.resolve().then(_ => {
        console.log('这是async2')
      })
    },
    // @loading('正在加载中', 'warning', (err) => { console.log('错了', err) })
    @confirm(this,
    '这是内容',
    '这是标题',
    () => { this.Result = 1 },
    () => { this.Result = 2 }
    )
    // @loading(this.Result == 1 ? '点击确定' : '点击取消', this.Result == 1 ? 'success' : 'warning' )
    async GoMessage (er) {
      console.log('什么时候运行这里', er,this.Result)
      // const loading = Message({
      //   message: 'message',
      //   type: 'info',
      //   duration: 800
      // })
      // this.$message.error('错了哦，这是一条错误消息')
    }

  }
}
</script>
