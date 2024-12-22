import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "/src/App.vue";
import "/src/assets/main.css";
import "/src/scss/styles.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router";
import VueDraggableResizable from 'vue-draggable-resizable'
import "../roslib.js";

// import * as bootstrap from "bootstrap";
// import "bootstrap/dist/css/bootstrap.css"

const app = createApp(App).component("vue-draggable-resizable", VueDraggableResizable);
app.use(createPinia()).use(router);
app.mount("#app");
