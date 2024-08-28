import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { PxPlus } from "oh-vue-icons/icons";

addIcons(PxPlus);

const app = createApp(App)
app.use(router)
    // .use(pinia)
app.mount('#app')
app.component("v-icon", OhVueIcon);
