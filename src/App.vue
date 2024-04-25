<script setup>
import main_menu from "./components/MainMenu.vue";

</script>

<template>
    <div style="min-height: 100vh;">
        <main_menu v-if="$route.name !== 'edit' && $route.name !== 'hist'"></main_menu>
        <div class="container-fluid">
            <FullScreen></FullScreen>
            <router-view v-slot="{ Component }">
                <Transition name="fade" mode="out-in">
                    <Component :is="Component" />
                </Transition>
            </router-view>
        </div>
    </div>
</template>

<style>
.container-fluid {
    -webkit-user-select: none;
    user-select: none;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .15s ease-out;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0);
}


</style>

<script>
import FullScreen from './components/FullScreen.vue';
export default {
    components: {
        FullScreen,
    },
    methods: {
        getTransitionName() {
            return this.$route.name === 'edit' ? 'slide-up' : 'fade'
        }
    }
}

</script>

<style scoped>
</style>
