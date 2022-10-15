import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./index.css"
import "flowbite"
import '@themesberg/flowbite';
// import 'flowbite/dist/flowbite.js'

createApp(App).use(store).use(router).mount('#app')
