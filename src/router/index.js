import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../components/MainPage.vue";
import TeleopPage from "../components/TeleopPage.vue";
import SettingsPage from "../components/SettingsPage.vue";
import LogsPage from "../components/LogsPage.vue";
import HNPage from "../components/HistoryNotifications.vue"
import TasksPage from "../components/TasksPage.vue"
import EditorTasks from "../components/EditorTasks.vue"

import { useRosStore } from '@/stores/ConfigStore';

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
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
    path: "/hist/:selectedOption?",
    name: "hist",
    component: HNPage,
  },
  {
    path: "/status",
    name: "status",
    component: LogsPage,
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
