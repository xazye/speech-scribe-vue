import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaPlus, FaAngleDoubleRight, FaMicrophone } from "oh-vue-icons/icons";

addIcons(FaPlus, FaAngleDoubleRight, FaMicrophone);

const app = createApp(App)
app.use(router)
    // .use(pinia)
app.component("v-icon", OhVueIcon);
app.mount('#app')
