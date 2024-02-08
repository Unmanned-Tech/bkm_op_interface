<script setup>
import main_menu from "./components/MainMenu.vue";
import main_page from "./components/MainPage.vue";
import robot_page from "./components/RobotPage.vue";

import { ref } from 'vue';
const count = ref(0);

</script>



<template>
    <main_menu></main_menu>
    <div class="container-fluid">
        <FullScreen></FullScreen>
        <router-view />
        
    </div>



</template>

<style>

</style>

<script>
import FullScreen from './components/FullScreen.vue';
export default {
    components: {
        FullScreen,
    }
}

</script>

<style scoped>
</style>
