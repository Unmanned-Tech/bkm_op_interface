<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
import main_menu from "./components/MainMenu.vue";
import main_page from "./components/MainPage.vue";
import robot_page from "./components/RobotPage.vue";
import FullScreen from "./components/FullScreen.vue";

import { ref } from 'vue';
const count = ref(0);
</script>



<template>
    <!-- <router-link to="/foo">Перейти к Foo</router-link>
    <router-link to="/bar">Перейти к Bar</router-link> -->
    <main_menu></main_menu>
    <div class="container-fluid">
        <router-view />
    </div>



</template>

<style>

</style>

<script>
    
</script>

<style scoped>
</style>
