import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import '../src/scss/styles.scss';
import main_page from "./components/MainPage.vue";
import robot_page from "./components/RobotPage.vue";
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from "./router";

import {popper} from "@popperjs/core";
import * as bootstrap from '../node_modules/bootstrap';

const app = createApp(App);
app.use(createPinia()).use(router);
app.mount("#app");S


