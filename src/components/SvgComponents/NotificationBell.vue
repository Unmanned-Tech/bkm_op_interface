<template>
    <div class="d-flex justify-content-end">
        <div class="btn-group dropstart position-absolute me-2">
            <button class="set" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                <bellSVG />
                <span class="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    4
                    <span class="visually-hidden">alert</span>
                </span>
            </button>
            <div class="dropdown-menu me-2 animate fade">
                <div class="dropdown-header align-items-center d-flex">
                    <span>Последние уведомления</span> 
                    <span>
                        <button class="set notts">
                            <router-link :to="{ name: 'hist', params: { selectedOption: store.threeSelectedOption } }">
                                <arrowToSVG style="scale: .8;"/>
                            </router-link>
                        </button> 
                    </span>
                </div>
                <div>
                </div>
                <div class="mt-1 px-3">
                    <Toast />
                </div>
                <p class=" mt-3 d-flex justify-content-center">
                    Нет более старых уведомлений
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import bellSVG from '/src/assets/notification-bing.svg';
import arrowToSVG from '/src/assets/arrowTo.svg';
import Toast from '../Toast.vue';
import { useThreeStore } from '../../stores/store';

export default {
    components: {
        bellSVG,
        arrowToSVG,
        Toast
    },
    setup() {
        const store = useThreeStore();

        return {
            store
        }
    }
}
</script>

<style scoped>
p {
    color: var(--grey);
}

.animate {
    animation-duration: .4s;
    animation-fill-mode: both;
}

.fade {
    animation-name: show;
}
.dropdown-menu {
    background-color: var(--bg-tertiary);
    border: none;
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    border-radius: 1.125rem;
}

@keyframes show {
    from {
        opacity: 0;
        
    }
    to {
        opacity: 1;
        
    }
}

.dropdown-header {
    font-weight: 400;
    font-size: 2rem;
    color: var(--text-color);
    @media (max-width: 896px) {
        font-size: 1.5rem;
    }
}
.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: .5rem;
    border-radius: 1.125rem;
    border: none;
    @media (max-width: 896px) {
        padding: 6px;
        border-radius: .85rem;
    }
}
.badge {
    font: 400 .75rem "SF Pro";
    border-radius: 50%;
    @media (max-width: 896px) {
        font-size: .6rem;
    }
}

.set.notts {
    background-color: var(--grey3);
    padding: .5px;
    margin-left: 1rem;
    @media (max-width: 896px) {
        font-size: rem;
        padding: .125px;
    }
}

</style>