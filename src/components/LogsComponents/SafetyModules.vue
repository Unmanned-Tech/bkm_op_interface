<template>
    <div class="modules-status" :class="{ 'config-mode': isConfiguring }">
        <div class="header">
            <h2>Модули безопасности</h2>
            <div class="config-controls">
                <div v-if="isApplying" class="applying-overlay">
                    {{ appliedCount }}/{{ totalChanges }}
                    <div class="progress-bar">
                        <div class="progress" :style="{ width: `${(appliedCount/totalChanges) * 100}%` }"></div>
                    </div>
                </div>
                <Transition name="fade-config" mode="out-in">
                    <button v-if="!isConfiguring" @click="enterConfigMode" class="config-btn">
                        Отключение модулей
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
                :key="module.id"
                class="card"
                :class="module.status"
            >
                <p class="label">{{ module.name }}</p>
                <div class="content-container">
                    <p class="status" v-show="!isConfiguring">{{ module.status === "active" ? "вкл." : (module.status === "inhibited" ? "игнор." : "выкл.") }}</p>
                    <div class="inhibit-control" v-show="isConfiguring">
                        <label class="ios-checkbox blue me-1">
                            <input 
                                type="checkbox" 
                                :id="'inhibit-' + module.id" 
                                v-model="inhibitConfig[module.id].value"
                                @change="inhibitConfig[module.id].dirty = true"
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
                        <label :for="'inhibit-' + module.id">Игнор.</label>
                    </div>
                </div>
            </div> 
        </div>
        
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, Transition } from 'vue';
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
    Object.fromEntries(Object.keys(MODULE_NAMES).map(id => [id, { value: false, dirty: false }]))
);

const currentInhibitState = ref({ ...inhibitConfig.value });

const statusInterval = ref(null);
const isApplying = ref(false);
const appliedCount = ref(0);
const totalChanges = ref(0);

// Общая функция для вызова сервисов
function callService(serviceName, serviceType, requestData = {}) {
    return new Promise((resolve, reject) => {
        if (!rosStore.ros) return reject("ROS not connected");
        const service = new ROSLIB.Service({ ros: rosStore.ros, name: serviceName, serviceType });
        const request = new ROSLIB.ServiceRequest(requestData);
        service.callService(request, resolve, reject);
    });
}

// Получение конфигурации ингибита
async function getInhibitConfig() {
    const start = performance.now();
    try {
        const res = await callService('/safety/cfg_inh_show', 'std_srvs/srv/Trigger');
        if (res.success && res.message.includes("F_CFG_INH")) {
            const states = res.message.split('_').slice(-Object.keys(MODULE_NAMES).length)
            Object.keys(MODULE_NAMES).forEach((id, i) => {
                const val = states[i] === '1';
                inhibitConfig.value[id].value = val;
                inhibitConfig.value[id].dirty = false;

                currentInhibitState.value[id] = val; 
            });
        }
    } catch (e) { console.error("Error getting inhibit config: ", e); }
    const end = performance.now();
    console.log(`[TIMING] getInhibitConfig took ${(end - start).toFixed(2)} ms`);
}

// Вход в режим конфигурации
async function enterConfigMode() {
    isConfiguring.value = true;
    if (statusInterval.value) { clearInterval(statusInterval.value); statusInterval.value = null; }
    await getInhibitConfig();
}

// Выход из режима конфигурации
function cancelConfig() {
    isConfiguring.value = false;
    if (!statusInterval.value) {
        callModulesStatusService();
        statusInterval.value = setInterval(statusTick, 5000);
    }
}

// Применение конфигурации
async function applyConfig() {
    const changedModules = Object.entries(inhibitConfig.value)
        .filter(([id, m]) => m.dirty)
        .map(([id, m]) => ({ id: parseInt(id), state: m.value }));

    if (changedModules.length === 0) { cancelConfig(); return; }

    isApplying.value = true;
    appliedCount.value = 0;
    totalChanges.value = changedModules.length;

    if (statusInterval.value) {
        clearInterval(statusInterval.value);
        statusInterval.value = null;
    }
    const applyStart = performance.now();

    try {
        for (const m of changedModules) {
            const modStart = performance.now();
            await callService('/safety/cfg_inh_module', 'mcu_msgs/srv/SetModuleState', { module_num: m.id, state: m.state ? 1 : 0 });
            const modEnd = performance.now();
            console.log(`[TIMING] Module ${m.id} apply took ${(modEnd - modStart).toFixed(2)} ms`);

            appliedCount.value++;
            inhibitConfig.value[m.id].dirty = false;
        }
        await getInhibitConfig();
        await callModulesStatusService();

    } catch (e) { console.error("Error applying inhibit config: ", e); } 
    finally {
        const applyEnd = performance.now();
        console.log(`[TIMING] Total applyConfig took ${(applyEnd - applyStart).toFixed(2)} ms`);
        isApplying.value = false;
        statusInterval.value = setInterval(statusTick, 5000);
        cancelConfig();
    }
}

// Обновление статуса модулей
const updateModulesStatus = (statusString) => {
    if (!statusString.includes("F_MODULES_STATUS")) return;
    const arr = statusString.split('_').slice(-Object.keys(MODULE_NAMES).length);

    safetyModules.value.forEach((m, i) => {
        if (inhibitConfig.value[m.id].value) { 
            m.status = "inhibited"; 
        } else {
            m.status = arr[i] === "1" ? "active" : "inactive";
        }
    });
};

// Асинхронный запрос статуса модулей
async function callModulesStatusService() {
    const start = performance.now();
    try {
        const res = await callService('/safety/modules_status', 'std_srvs/srv/Trigger');
        if (res.success) updateModulesStatus(res.message);
    } catch (e) { console.error("Error fetching modules status: ", e); }
    const end = performance.now();
    console.log(`[TIMING] callModulesStatusService took ${(end - start).toFixed(2)} ms`);
}

// throttle для статусов
function statusTick() {
    if (isApplying.value) return;
    callModulesStatusService().catch(console.error);
}

function startStatusLoop() {
    if (statusInterval.value) clearInterval(statusInterval.value);

    statusInterval.value = setInterval(async () => {
        if (isApplying.value) return; // пропускаем тик
        try {
            await callModulesStatusService();
        } catch (e) { console.error(e); }
    }, 5000);
}

onMounted(async () => {
    await getInhibitConfig();
    startStatusLoop();
});

onUnmounted(() => { if (statusInterval.value) { clearInterval(statusInterval.value); } });
</script>

<style lang="css" scoped>
@import url("@/assets/checkbox.css");

p {
    margin: 0;
}

h2 {
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

.progress-bar { width:80%; height:4px; background:#ddd; border-radius:4px; overflow:hidden; margin-top:4px; }
.progress { height:4px; background:var(--green); transition: width 0.3s ease; }

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
