import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store.js";
import axios from "axios";
import VueAxios from "vue-axios";
import "spotlight.js/dist/css/spotlight.min.css";

createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .mount("#app");
