
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { useKakao } from 'vue3-kakao-maps/@utils';
const { VITE_KAKAO_MAP_SERVICE_KEY } = import.meta.env;

import "./assets/main.css"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons CSS 추가


import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(far, fas);

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  // icons: {
  //   defaultSet: 'mdi', // mdi를 기본 아이콘 세트로 설정
  // },
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.use(vuetify)
useKakao(VITE_KAKAO_MAP_SERVICE_KEY, ['clusterer', 'services', 'drawing']);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app")


