import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "/src/App.vue";
import "/src/assets/main.css";
import "/src/scss/styles.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router";
import "../roslib.js";

// import * as bootstrap from "bootstrap";
// import "bootstrap/dist/css/bootstrap.css"

const app = createApp(App);
app.use(createPinia()).use(router);
app.mount("#app");
