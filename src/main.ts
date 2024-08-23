import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
    // .use(pinia)
app.mount('#app')
