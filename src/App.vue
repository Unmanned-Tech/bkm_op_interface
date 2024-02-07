<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
import main_menu from "./components/MainMenu.vue";
import main_page from "./components/MainPage.vue";
import robot_page from "./components/RobotPage.vue";

</script>



<template>
    <main_menu></main_menu>
    <div class="container-fluid">
        <router-view />
    </div>



</template>

<style>

</style>

<script>
export default {
    mounted: function() {
        console.log('data');
    }
}

</script>

<style scoped>
</style>
