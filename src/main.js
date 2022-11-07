import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import '../src/scss/styles.scss';
import main_page from "./components/MainPage.vue";
import robot_page from "./components/RobotPage.vue";
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from "./router";
// // Импортируйте весь JS Bootstrap
import * as bootstrap from 'bootstrap';

const app = createApp(App).use(router);
// app.use(VueRouter(routes));
app.use(createPinia());
app.mount("#app");
