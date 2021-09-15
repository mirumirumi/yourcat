// "@vue/cli-plugin-eslint": "~4.5.0",
// "@vue/eslint-config-prettier": "^6.0.0",
// "babel-eslint": "^10.1.0",
// "eslint": "^6.7.2",
// "eslint-plugin-prettier": "^3.3.1",
// "eslint-plugin-vue": "^7.0.0",

import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/privacy",
    name: "Privacy",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Privacy.vue"),
  },
  {
    path: "/license",
    name: "License",
    component: () => import(/* webpackChunkName: "about" */ "../views/License.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
