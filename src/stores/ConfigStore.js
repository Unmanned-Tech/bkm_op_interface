import { ref, computed } from "vue";
import { defineStore } from "pinia";


export const useConfigStore = defineStore("configStore",{
    store: ()=>({
        robotConfig:{
            ros_bridge_url: "ws://192.168.0.106:9090",
        },
    })
    // const count = ref(0);
    // const doubleCount = computed(() => count.value * 2);
    // function increment() {
    //   count.value++;
    // }
  
    // return { count, doubleCount, increment };
  });