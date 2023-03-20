import { createRouter, createWebHashHistory } from "vue-router";
import Applet from "../views/Applet.vue";

const routes = [
  {
    path: "/iframe",
    name: "IFrame",
    component: () => import("../views/IFrame.vue"),
  },
  {
    path: "/",
    name: "FileList",
    component: () => import("../views/FileList.vue"),
  },
];
const router = createRouter({
  mode: "history",
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
