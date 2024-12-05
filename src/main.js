import './assets/main.scss'
import locale from 'element-plus/dist/locale/zh-cn.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import {createPersistedState} from'pinia-persistedstate-plugin'

import 'element-plus/dist/index.css'
import App from './App.vue'

import router from './router'

const pinia = createPinia()
const app = createApp(App)
const persist = createPersistedState()
//导入持久化插件
//pinia使用持久化插件
pinia.use(persist)
app.use(router)
app.use(ElementPlus,{locale})
app.use(pinia)
app.mount('#app')
