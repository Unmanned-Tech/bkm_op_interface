import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "/src/App.vue";
import "/src/assets/main.css";
import "/src/scss/styles.scss";
import main_page from "./components/MainPage.vue";
import robot_page from "./components/RobotPage.vue";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/src/dropdown.js'
import 'bootstrap/js/src/toast.js'
import router from "./router";

// import * as bootstrap from '/node_modules/bootstrap';

const app = createApp(App);
app.use(createPinia()).use(router);
app.mount("#app");


