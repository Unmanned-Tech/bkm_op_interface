<template>
    <div class="d-flex justify-content-end">
        <div class="btn-group dropstart position-absolute">
            <button class="set" data-bs-toggle="dropdown" aria-expanded="false">
                <bellSVG />
            </button>
            <div class="dropdown-menu me-2">
                <div class="dropdown-header align-items-center d-flex">
                    <span>Последние уведомления</span> 
                    <span>
                        <button class="set notts">
                            <router-link to="/logs">
                                <arrowToSVG />
                            </router-link>
                        </button> 
                    </span>
                </div>
                <div>
                </div>
                <p class="p-3 d-flex justify-content-center">
                    Нет более старых уведомлений
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import bellSVG from '/src/assets/notification-bing.svg';
import arrowToSVG from '/src/assets/arrowTo.svg';
export default {
    components: {
        bellSVG,
        arrowToSVG,
    },
}
</script>

<style scoped>
p {
    color: var(--grey);
}
.dropdown-menu {
    background-color: var(--bg-tertiary);
    border: none;
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    animation: .3s show ease;
    border-radius: 1.125rem;
}

@keyframes show {
    from { opacity: 0; transform: translateY(0);}
    to { opacity: 1; }
}

.dropdown-header {
    font: 400 2rem "SF Pro Display";
    color: var(--text-color);
}
.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: .5rem;
    border-radius: 1.125rem;
    border: none;
  }

.set.notts {
    background-color: var(--grey3);
    padding: .25rem;
    margin-left: 1rem;
}

</style>