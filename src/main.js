// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'
import "@/index.css"// 引入tailwindcss样式

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')