import { createRouter, createWebHistory,  createWebHashHistory} from "vue-router";
import MainPage from "../components/MainPage.vue";
import RobotPage from "../components/RobotPage.vue";
import TeleopPage from "../components/TeleopPage.vue";
import SettingsPage from "../components/SettingsPage.vue";
import LogsPage from "../components/LogsPage.vue";
import StatusPage from "../components/StatusPage.vue"
import TasksPage from "../components/TasksPage.vue"
import EditorTasks from "../components/EditorTasks.vue"

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
    component: TeleopPage,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
  },
  {
    path: "/logs",
    name: "logs",
    component: LogsPage,
  },
  {
    path: "/status",
    name: "status",
    component: StatusPage,
  },
  {
    path: "/tasks/:selectedOption?",
    name: "tasks",
    component: TasksPage,
  },
  {
    path: "/edit/:mode?",
    name: "edit",
    component: EditorTasks,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
