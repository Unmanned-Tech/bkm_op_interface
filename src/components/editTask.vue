<template>
    <div class="d-flex align-items-center">
        <div class="btn-group dropend">
            <button class="other" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                <otherSVG />
            </button>
            <div class="dropdown-menu animate fade ms-2">
                <div class="dropdown-header align-items-center d-flex p-0">
                    <button class="actions" @click="switcher">
                        <pauseSVG v-if="isPause"/>
                        <playSVG v-if="!isPause"/>
                    </button>
                    <button class="actions"><pencilSVG /></button>
                    <button class="actions"><xlgSVG /></button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import otherSVG from '/src/assets/three-dots.svg';
import pauseSVG from '/src/assets/pause.svg';
import pencilSVG from '/src/assets/pencil.svg';
import xlgSVG from '/src/assets/x-lg.svg';
import playSVG from '/src/assets/play.svg';

export default {
    data: function() {
        return {
            isPause: true,
        }
    },
    components: {
        otherSVG,
        pauseSVG,
        pencilSVG,
        xlgSVG,
        playSVG,
    },

    methods: {
        switcher() {
            this.isPause = !this.isPause;
        },

    }
}

</script>

<style scoped>
.other {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--grey2);
    padding: .5rem;
    border-radius: 1.125rem;
    border: none;
    margin: 0rem 1rem;
}

.actions {
    padding: .35rem;
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--grey5);
    margin: 0rem .5rem;
    border: none;
    border-radius: 1.125rem;
}
.dropdown-menu {
    background-color: var(--grey2);
    border: none;
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    border-radius: 1.125rem;
}
.animate {
    animation-duration: .4s;
    animation-fill-mode: both;
}

.fade {
    animation-name: show;
}
@keyframes show {
    0% { opacity: 0; }
    100% { opacity: 1; }
    0% { opacity: 0; }
}
</style>