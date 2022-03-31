import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Terms from "../views/Terms.vue";
import Privacy from "../views/Privacy.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {title: "PhotoCat | Photo Sharing for All Cat Persons"},
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
    meta: {title: "Terms | PhotoCat"},
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
    meta: {title: "Privacy | PhotoCat"},
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/",
    meta: {title: "Nyan?🐱 - 404"},
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title;
})

export default router;
