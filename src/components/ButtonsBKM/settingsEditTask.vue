<template>
    <div class="row mt-2 mt-lg-4" style="height: 328.8px;">
        <!-- <div class="col-3">
            <div class="caption_low mb-3">Оборудование:</div>
            <select class="ms-3 form__select">
                <option value="1" selected>Щётка</option>
                <option value="2">БКМ-2</option>
                <option value="3">БКМ-3</option>
            </select>
        </div> -->
        <!-- <div class="col-4">
            <div class="row mb-2 mb-lg-3 align-items-center">
                <div class="col">
                    <span class="caption_low">Триггер задачи:</span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <input type="checkbox" class="form-check-input" v-model="showTriggers">
                </div>
            </div>
            <div class="triggers" :class="{ active: showTriggers }">
                <div class="row mb-2 mb-lg-3 align-items-center">
                    <div class="col">
                        <span class="caption_low">Осадки:</span>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <select class="form__select d-flex" v-model="dataStore.selectedOption" @change="saveSelOption">
                            <option value="1">Снег</option>
                            <option value="2">БКМ-2</option>
                            <option value="3">БКМ-3</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2 mb-lg-3 align-items-center">
                    <div class="col">
                        <span class="caption_low">Температура:</span>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <input class="inp" v-model="temperature" @input="handleTemperatureInput" type="number">
                        <span class="caption_low ms-2">°C</span>
                    </div>
                </div>
                <div class="row mb-2 mb-lg-3 align-items-center">
                    <div class="col">
                        <span class="caption_low">Время:</span>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <input type="time" class="inp time" v-model="time" @input="() => saveTime(time)">
                    </div>
                </div>
                <div class="row mb-2 mb-lg-3 align-items-center">
                    <div class="col">
                        <span class="caption_low">Заряд:</span>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <input class="inp" v-model="charge" @input="handleChargeInput" type="number">
                        <span class="caption_low ms-2">%</span>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="col-4 ms-auto me-auto">
            <sliderInputTask />
        </div>
        <div class="col">
            <Map />
        </div>
    </div>
    <div class="row mt-3">
        
    </div>
</template>

<script setup>
import { useDataStore } from '../../stores/store';

const dataStore = useDataStore();

let temperature = null;
let charge = null;

function handleChargeInput() {
  if (charge < 0) {
    charge = 0;
  } else if (charge > 100) {
    charge = 100;
  }

  saveCharge(charge);
}

function handleTemperatureInput() {
  if (temperature < -50) {
    temperature = -50;
  } else if (temperature > 50) {
    temperature = 50;
  }

  saveTemperature(temperature);
}

function saveSelOption(event) {
    const selectedValue = event.target.value;
    dataStore.setSelOption(selectedValue);
}

function saveTemperature(value) {
    dataStore.setTemperature(value);
};
function saveTime(value) {
    dataStore.setTime(value);
};
function saveCharge(value) {
    dataStore.setCharge(value);
};

</script>

<script>
import sliderInputTask from './sliderInputTask.vue';
import Map from '../maps/MapTask.vue';

export default {
    components: {
        sliderInputTask,
        Map
    },
    data() {
        return {
            showTriggers: false,
        };
    },
}
</script>

<style scoped>
.triggers {
    max-height: 0;
    overflow: hidden;
    transition: max-height .5s ease-out;
}
.triggers.active {
    max-height: 100%;
}
.inp {
    font-size: 1.75rem;
    width: 50%;
    outline: none;
    background-color: var(--bg-tertiary);
    color: var(--text-color);
    caret-color: var(--blue);
    border: none;
    border-radius: 1.125rem;
    box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
    padding: .25rem .5rem;
    @media (max-width: 896px) {
        font-size: 1.25rem;
    }
}
.inp.time {
    width: 100%;
}
input[type="time"]::-webkit-calendar-picker-indicator {
    background: url(/src/assets/clock-light.svg);
}
.caption_low {
    font-size: 1.95rem;
    @media (max-width: 896px) {
        font-size: 1.25rem;
    }
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
    @media (max-width: 896px) {
        font-size: 1.5rem;
    }
}
.form-check-input {
    transform: scale(2); 
    box-shadow: none;
    background-color: transparent;
    border-color: var(--grey2);
    @media (max-width: 896px) {
        transform: scale(1.5);
    }
}
.form-check-input:checked {
    background-color: var(--blue);
    border-color: var(--blue);
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
</style>
