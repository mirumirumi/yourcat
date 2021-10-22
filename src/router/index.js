// "@vue/cli-plugin-eslint": "~4.5.0",
// "@vue/eslint-config-prettier": "^6.0.0",
// "babel-eslint": "^10.1.0",
// "eslint": "^6.7.2",
// "eslint-plugin-prettier": "^3.3.1",
// "eslint-plugin-vue": "^7.0.0",

import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import Terms from "../views/Terms.vue";
import Privacy from "../views/Privacy.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
