import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store.js";
import axios from "axios";
import VueAxios from "vue-axios";

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .mount("#app");
