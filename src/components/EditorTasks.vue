<template>
    <div>
        <div class="row mt-3">
            <div class="col d-flex mt-auto mb-auto">
                <button class="button" @click="goBack">
                    <div class="col svg me-1 d-flex align-items-center justify-content-center"><arrowSVG /></div>
                    <div class="col p-0 me-3">Назад</div>
                </button>        
            </div>
            <div class="col d-flex justify-content-end">
                <span class="header">
                    Редактор задач
                </span>
            </div>
        </div>
        <div class="row line mb-4 mt-4"></div>
        <div class="row">
            <div class="col-3">
                <div class="form__group">
                    <input type="input" class="form-field" id="nameTask" name="nameTask" placeholder="Название задачи" required>
                    <label for="nameTask" class="form__label">Название задачи</label>
                </div>
            </div>
            <div class="col-4 mb-auto d-flex justify-content-end">
                <select class="form__select">
                    <option disabled selected>Робот</option>
                    <option value="1">БКМ-1</option>
                    <option value="2">БКМ-2</option>
                    <option value="3">БКМ-3</option>
                </select>
                
            </div>
            <div class="col">
                <segmented />
            </div>
        </div>
        <settingsEditTask v-if="anotherSelectedOption === 'Настройки'"/>
        <mapEditTask v-if="anotherSelectedOption === 'Карта'"/>
        <div class="row">
            <div class="col">
                <button class="ms-3 button">
                    <div class="px-3 py-1 ln">Сохранить<br/>задачу</div>
                </button> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAnotherStore } from '../stores/store';
import { useRoute, useRouter } from 'vue-router';
import { watchEffect, computed } from 'vue';
import { useStore } from '../stores/store';

const store = useStore();

const anotherStore = useAnotherStore();

const route = useRoute();
const router = useRouter();

const anotherSelectedOption = computed(() => anotherStore.anotherSelectedOption);

watchEffect(() => {
  const anotherSelectedOptionFromRoute = route.params.mode;
  if (anotherSelectedOptionFromRoute !== anotherStore.anotherSelectedOption) {
    anotherStore.setAnotherSelectedOption(anotherSelectedOptionFromRoute);
  }
});

function goBack() {
    router.push({ name: 'tasks', params: { selectedOption: store.selectedOption } })
};

</script>

<script>
import mapEditTask from './ButtonsBKM/mapEditTask.vue';
import arrowSVG from '/src/assets/arrow.svg'
import segmented from './ButtonsBKM/segmented.vue';
import settingsEditTask from './ButtonsBKM/settingsEditTask.vue';

export default {
    components: {
        arrowSVG,
        segmented,
        settingsEditTask,
        mapEditTask,
    },
}
</script>

<style scoped>
.ln {
    padding: .5rem;
    line-height: 1.5rem;
  }
.form__select {
    font-weight: 400;
    font-size: 1.75rem;
    border: 0;
    padding: .5rem 2.5rem;
    text-align: center;
    color: var(--text-color);
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
}
select:focus,
select:active,
option:active,
option:focus {
    box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
    outline: none;
}

option {
    font-size: 1.125rem;
}
option:checked {
    font-weight: 700;
}
.form__group {
    position: relative;
    padding: 1rem 0 0;
    width: 100%;
}
.form-field {
    font: 400 1.5rem "SF Pro Display";
    border: 0;
    border-bottom: 2px solid var(--grey2);
    outline: 0;
    color: var(--text-color);
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    caret-color: var(--blue);

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ .form__label {
        font-family: 'SF Pro Light';
        font-size: 1.5rem;
        cursor: text;
        top: 1.125rem;
    }
}
.form__label {
    font-family: 'SF Pro Light';
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: var(--grey);
}
.line {
    border-top: solid .125rem var(--bg-tertiary);
}
.header {
    font: 400 2.25rem "SF Pro Display";
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    padding: .5rem 1.5rem;
    border: solid .125rem var(--grey);
}
.svg {
    padding: 0;
    transform: rotate(180deg) scale(0.8);
    
}
.button {
    box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    color: var(--text-color);
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 400 1.75rem "SF Pro Display";
    padding: .5rem .75rem;
    text-decoration: none;
  }
</style>