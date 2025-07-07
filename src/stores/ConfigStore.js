import { ref, onBeforeMount, onMounted } from "vue";
import { defineStore } from "pinia";

export const useRosStore = defineStore("ros",() => {
    const ros = ref(null);
    const isConnected = ref(false);
    const connectionError = ref(null);

    const connect = (url = "ws://192.168.0.18:9090") => {
        ros.value = new ROSLIB.Ros({ url });

        ros.value.on("connection", () => {
            console.debug("Connected over websocket: ", url);
            isConnected.value = true;
            localStorage.setItem("rosCon", isConnected.value);
            connectionError.value = null;
        });

        ros.value.on("error", (error) => {
            console.error("Error connected over websocket: ", error);
            isConnected.value = false;
            localStorage.setItem("rosCon", isConnected.value);
            connectionError.value = error;
        });

        ros.value.on("close", () => {
            console.warn("Connection over websocket closed.");
            isConnected.value = false;
            localStorage.setItem("rosCon", isConnected.value);
        })
    }

    onBeforeMount(() => connect());
    // onUnmounted(() => ros.value?.close());
    
    return { ros, isConnected, connectionError, connect };
});