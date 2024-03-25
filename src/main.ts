import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import toast from './plugins/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(toast.Toast, toast.options)

app.mount('#app')
