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

                    <label for="maxRpmInput" class="form-label">Максимальные обороты (max_rpm)</label>
                    <input
                        id="maxRpmInput"
                        type="number"
                        class="form-control mb-2"
                        v-model.number="maxRpmInput"
                        min="5000"
                        max="10000"
                        step="1000"
                    >
                    <button class="btn btn-primary w-100" @click="setMaxRpm">Установить max_rpm</button>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import settingsSVG from '/src/assets/settings.svg';
import resetSVG from '/src/assets/arrow-repeat.svg';
import { useBkmStore } from '../stores/bkmStore';
import { useRosStore } from '../stores/ConfigStore';

export default {
    components: {
        settingsSVG,
        resetSVG,
    },
    data() {
        return {
            maxRpmInput: 5000,
        };
    },

    computed: {
        bkmStore() {
            return useBkmStore();
        },
        rosStore() {
            return useRosStore();
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

    methods: {
        setMaxRpm() {
            if (!this.rosStore.ros) {
                console.error('ROS connection not established');
                return;
            }
            if (this.maxRpmInput <= 0) {
                alert('max_rpm должен быть положительным числом');
                return;
            }

            const setMaxRpmSrv = new window.ROSLIB.Service({
                ros: this.rosStore.ros,
                name: '/set_max_rpm',
                serviceType: 'mcu_msgs/srv/SetMaxRPM',
            });

            const request = new window.ROSLIB.ServiceRequest({
                new_max_rpm: this.maxRpmInput,
            });

            setMaxRpmSrv.callService(request, (result) => {
                if (result.success) {
                    console.log(`max_rpm успешно установлен в ${this.maxRpmInput}`);
                    alert(`max_rpm установлен: ${this.maxRpmInput}`);
                } else {
                    console.warn('Не удалось установить max_rpm');
                    alert('Ошибка при установке max_rpm');
                }
            });
        }
    }
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