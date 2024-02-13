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
        <router-view v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <Component :is="Component" />
            </Transition>
        </router-view>
        
    </div>



</template>

<style>



.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .15s ease-out;
}
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
