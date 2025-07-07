<template>
    <div class="modules-status" :class="{ 'config-mode': isConfiguring }">
        <div class="header">
            <h2>Safety Modules</h2>
            <div class="config-controls">
                <div v-if="isApplying" class="applying-overlay">
                    Applying changes: {{ appliedCount }}/{{ totalChanges }}
                </div>
                <Transition name="fade-config" mode="out-in">
                    <button v-if="!isConfiguring" @click="enterConfigMode" class="config-btn">
                        Изменить inhibit
                    </button>
                    <div v-else class="config-actions">
                        <button @click="applyConfig" class="apply-btn">Применить</button>
                        <button @click="cancelConfig" class="cancel-btn">Отменить</button>
                    </div>
                </Transition>
            </div>
        </div>
        
        <div class="cards">
            <div
                v-for="(module, index) in safetyModules"
                :key="`${module.id}-${module.status}`"
                class="card"
                :class="module.status"
            >
                <p class="label">{{ module.name }}</p>
                <div class="content-container">
                    <Transition name="fade-switch">
                        <p class="status" v-if="!isConfiguring">{{ module.status }}</p>
                    </Transition>

                    <Transition name="fade-switch">
                        <div v-if="isConfiguring" class="inhibit-control">
                            <label class="ios-checkbox blue me-1">
                                <input 
                                    type="checkbox" 
                                    :id="'inhibit-' + module.id" 
                                    v-model="inhibitConfig[module.id]"
                                />
                                <div class="checkbox-wrapper">
                                    <div class="checkbox-bg"></div>
                                    <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
                                        <path
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                        stroke-width="3"
                                        stroke="currentColor"
                                        d="M4 12L10 18L20 6"
                                        class="check-path"
                                        ></path>
                                    </svg>
                                </div>
                            </label>
                            <label :for="'inhibit-' + module.id">Inhibit</label>
                        </div>
                    </Transition>
                </div>
            </div> 
        </div>
        
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, Transition, TransitionGroup } from 'vue';
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from 'roslib';

const rosStore = useRosStore();

const MODULE_NAMES = {
    1: "DOOR1_NC",
    2: "DOOR1",
    3: "DOOR2_NC",
    4: "DOOR2",
    5: "DOOR3_NC",
    6: "DOOR3",
    7: "DOOR4_NC",
    8: "DOOR4",
    9: "EM_RO_1",
    10: "EM_RO_2",
    11: "EM_BTN_1",
    12: "EM_BTN_2",
    13: "EM_BTN_3",
    14: "S1",
    15: "S2",
    16: "S3",
    17: "S4",
    18: "S5"
};

const safetyModules = ref(
    Object.entries(MODULE_NAMES).map(([id, name]) => ({
        id: parseInt(id),
        name,
        status: "inactive"
    }))
);

const isConfiguring = ref(false);
const inhibitConfig = ref(
    Object.keys(MODULE_NAMES).reduce((acc, id) => {
        acc[id] = false;
        return acc;
    }, {})
);
const prevInhibitConfig = ref({});
const statusInterval = ref(null);

const isApplying = ref(false);
const appliedCount = ref(0);
const totalChanges = ref(0);

// Общая функция для вызова сервисов
function callService(serviceName, serviceType, requestData = {}) {
    return new Promise((resolve, reject) => {
        if (!rosStore.ros) {
            reject("ROS not connected");
            return;
        }

        const service = new ROSLIB.Service({
            ros: rosStore.ros,
            name: serviceName,
            serviceType: serviceType
        });

        const request = new ROSLIB.ServiceRequest(requestData);

        service.callService(request, (response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    });
}

// Получение конфигурации ингибита
async function getInhibitConfig() {
    try {
        const response = await callService(
            '/safety/cfg_inh_show',
            'std_srvs/srv/Trigger'
        );

        if (response.success && response.message.includes("F_CFG_INH")) {
            const states = response.message.split('_').slice(-Object.keys(MODULE_NAMES).length)

            Object.keys(MODULE_NAMES).forEach((id, index) => {
                inhibitConfig.value[id] = states[index] === '1';
            });
        }
    } catch (error) {
        console.error("Error getting inhibit config: ", error);
    }
};

// Вход в режим конфигурации
async function enterConfigMode() {
    isConfiguring.value = true;

    if (statusInterval.value) {
        clearInterval(statusInterval.value);
        statusInterval.value = null;
    }

    await getInhibitConfig();
    prevInhibitConfig.value = {...inhibitConfig.value};
}

// Выход из режима конфигурации
function cancelConfig() {
    isConfiguring.value = false;

    if (!statusInterval.value) {
        callModulesStatusService();
        statusInterval.value = setInterval(callModulesStatusService, 3000);
    }
}

// Применение конфигурации
async function applyConfig() {
    try {
        const changedModules = [];

        Object.entries(inhibitConfig.value).forEach(([moduleId, currentState]) => {
            const previousState = prevInhibitConfig.value[moduleId];

            if (previousState !== undefined && currentState !== previousState) {
                changedModules.push({
                    id: parseInt(moduleId),
                    state: currentState
                });
            }
        });

        if (changedModules.length === 0) {
            cancelConfig();
            return;
        }

        isApplying.value = true;
        appliedCount.value = 0;
        totalChanges.value = changedModules.length;

        const requests = changedModules.map((module) =>
            callService('/safety/cfg_inh_module', 'mcu_msgs/srv/SetModuleState', {
                module_num: module.id,
                state: module.state ? 1 : 0
            }).then(() => { appliedCount.value++; })
        );

        await Promise.all(requests);
        isApplying.value = false;

        await getInhibitConfig();
        await callModulesStatusService();

        prevInhibitConfig.value = { ...inhibitConfig.value };

        cancelConfig();
    } catch (error) {
        console.error("Error applying inhibit config: ", error);
    }
}

// Обновление статуса модулей
const updateModulesStatus = (statusString) => {
    if (!statusString.includes("F_MODULES_STATUS")) return;

    try {
        const statusArray = statusString.split('_').slice(-Object.keys(MODULE_NAMES).length);
        safetyModules.value = Object.entries(MODULE_NAMES).map(([id, name]) => {
            const inhibited = inhibitConfig.value[id];
            const active = statusArray[id - 1] === "1";

            return {
                id: parseInt(id),
                name,
                status: inhibited ? "inhibited" : (active ? "active" : "inactive") 
            };
        });
    } catch (e) {
        console.error("Error parsing modules status:", e);
    }
};

// Асинхронный запрос статуса модулей
async function callModulesStatusService() {
    try {
        const response = await callService(
            '/safety/modules_status',
            'std_srvs/srv/Trigger'
        );

        if (response.success) {
            updateModulesStatus(response.message);
        }
    } catch (error) {
        console.error("Error fetching modules status: ", error);
    }
};

onMounted(async () => {
    try {
        await Promise.all([getInhibitConfig(), callModulesStatusService()]);

        prevInhibitConfig.value = { ...inhibitConfig.value };

        statusInterval.value = setInterval(async () => {
            try {
                await callModulesStatusService();
            } catch (error) {
                console.error("Error fetching modules status:", error);
            }
        }, 3000);

        onUnmounted(() => {
            if (statusInterval.value) {
                clearInterval(statusInterval.value);
            }
        });
    } catch (error) {
        console.error("Initialization error: ", error);
    }    
})
</script>

<style lang="css" scoped>
@import url("@/assets/checkbox.css");

p {
    margin: 0;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.modules-status {
    height: 100%;
    width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
    box-sizing: border-box;
}

.applying-overlay {
    margin-right: 0.5rem;
    color: var(--p-slate-500);
    display: flex;
    align-items: center;
}

.modules-status .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
}

.modules-status .card {
    background: var(--grey4);
    padding: 0.5rem;
    border-radius: 12px;
    text-align: center;
    min-height: 72px;
}

.modules-status .card.active {
    background-color: var(--p-green-950);
    .label {
        color: var(--text-color);
    }
    .status {
        color: var(--p-emerald-400);
    }
    border: 2px solid var(--p-emerald-900);
}

.modules-status .card.inactive {
    background-color: color-mix(in srgb, var(--p-red-950) 30%, transparent);
    .label {
        color: var(--text-color);
    }
    .status {
        color: var(--p-red-500);
    }
    border: 2px solid var(--p-red-900);
}

.modules-status .card.inhibited {
    background-color: color-mix(in srgb, var(--p-orange-400) 30%, transparent);
    .label {
        color: var(--text-color);
    }
    .status {
        color: var(--p-orange-300);
    }
    border: 2px solid var(--p-orange-700);
}

.label {
    text-align: center;
    align-items: center;
    margin-bottom: 0.25rem;
}

.content-container {
    position: relative;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status, .inhibit-control {
    position: absolute;
    width: 100%;
}

.fade-switch-enter-active, .fade-switch-leave-active {
    transition: opacity 0.3s ease;
}
.fade-switch-enter-from, .fade-switch-leave-to {
    opacity: 0;
}

.config-controls {
    display: flex;
    justify-content: flex-end;
}

.config-btn, .apply-btn, .cancel-btn {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    border: none;
}

.config-btn {
    background-color: color-mix(in srgb, rgba(14,165,233,1.0) 16%, transparent);
    color: var(--p-sky-300);
    border: 2px solid var(--p-sky-900);
}

.apply-btn {
    background-color: var(--green);
    color: var(--text-color);
    margin-right: 0.5rem;
}

.cancel-btn {
    background-color: var(--grey6);
    color: var(--text-color);
}

.inhibit-control {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 968px) {
    .modules-status :deep(.label) {
        font-size: 0.9rem;
    }

    .modules-status :deep(.status) {
        font-size: 0.85rem;
    }

    h2 {
        font-size: 1.5rem;
    }
}

.fade-config-enter-active,
.fade-config-leave-active {
    transition: all 0.5s ease;
}

.fade-config-enter-from,
.fade-config-leave-to {
    opacity: 0;
}

.config-btn, .apply-btn, .cancel-btn {
    transition: 
        transform 0.2s ease,
        box-shadow 0.3s ease;
}

.config-btn:active, .apply-btn:active, .cancel-btn:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Эффект при переключении режима */
.modules-status {
    transition: background-color 0.5s ease;
}

.modules-status.config-mode {
    background-color: var(--grey4);
}
</style>
