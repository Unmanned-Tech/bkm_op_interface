import { createRouter, createWebHistory,  createWebHashHistory} from "vue-router";
import MainPage from "../components/MainPage.vue";
import RobotPage from "../components/RobotPage.vue";
import TeleopPage from "../components/TeleopPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/robot",
    name: "Robot",
    component: RobotPage
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/teleop",
    name: "teleop",
    component: TeleopPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
