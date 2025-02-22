<template>
    <div class="mb-2">
        <div class="btn-group dropstart">
            <button class="set" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                <settingsSVG />
            </button>
            <div class="dropdown-menu animate fade">
                <div class="dropdown-header">
                    <div class="row mb-3 align-items-center">
                        <div class="col">
                            <div class="caption">Настройки</div>
                        </div>
                    </div>
                    <h5>БКМ</h5>
                    <select class="form-select" v-model="selectedBkm" aria-label="Default select example">
                        <option disabled>Выбор БКМ</option>
                        <option value="БКМ-1">БКМ-1</option>
                        <option value="БКМ-2">БКМ-2</option>
                    </select>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import settingsSVG from '/src/assets/settings.svg';
import resetSVG from '/src/assets/arrow-repeat.svg';
import { useBkmStore } from '../stores/bkmStore';

export default {
    components: {
        settingsSVG,
        resetSVG,
    },

    computed: {
        bkmStore() {
            return useBkmStore();
        },
        selectedBkm: {
            get() {
                return this.bkmStore.selectedBkm;
            },
            set(value) {
                this.bkmStore.setBkm(value);
            }
        }
    },
}
</script>

<style scoped>
.caption {
    font-size: 1.35rem;
}
.tongue{
  background-color: var(--bg-tertiary);
  border: solid .125rem var(--grey2);
  padding-block: .25rem;
  padding-inline: .5rem;
  border-radius: .85rem;
  font-size: 1.25rem;
  color: var(--text-color);
}
.tongue.active {
    border-color: var(--green);
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
    border: solid var(--grey2) .125rem;
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
    color: var(--text-color);
}
.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: .35rem;
    border-radius: 1.125rem;
    border: solid var(--grey2) .125rem;
    outline: nones;
}

.reset {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--grey2);
    padding: .25rem;
    border-radius: 12px;
    border: none;
}
</style>