<template>
    <div class="safety-control">
        <h4>Управление безопасности</h4>

        <div class="control-buttons">
            <!-- Reset Inhibit Configuration -->
            <button 
                @click="callService('/safety/cfg_inh_reset', 'std_srvs/srv/Trigger')"
                class="control-btn reset-btn"
            >
                Сбросить игнорирование
            </button>

            <!-- Heartbeat Monitoring Group -->
            <button
                @click="toggleHbMon"
                class="control-btn hb-btn"
                :class="{ active: hbmonState }"
            >
                {{ hbmonState ? 'Отключить' : 'Включить' }} проверку соединения
            </button>
            
            <!-- Software Emergency Stop Group -->
            <button
                @click="toggleSwes"
                class="control-btn swes-btn"
                :class="{ active: swesState }"
            >
                {{ swesState ? 'Отключить' : 'Включить' }} программную остановку
            </button>

            <!-- Safety Unlock -->
            <SafetyUnlockButton />
        </div>

        <!-- Notification area -->
        <div v-if="notification.message" class="notification" :class="notification.type">
            {{ notification.message }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from 'roslib';
import SafetyUnlockButton from '../SafetyUnlockButton.vue';

const rosStore = useRosStore();

// States
const hbmonState = ref(true);
const swesState = ref(true);
const notification = ref({
    message: '',
    type: ''
});

// General service call function
function callService(serviceName, serviceType) {
    return new Promise((resolve, reject) => {
        if (!rosStore.ros) {
            showNotification("ROS not connected", "error");
            reject("ROS not connected");
            return;
        }

        const service = new ROSLIB.Service({
            ros: rosStore.ros,
            name: serviceName,
            serviceType: serviceType
        });

        const request = new ROSLIB.ServiceRequest({});

        service.callService(request, (response) => {
            if (response.success) {
                showNotification("Success", "success");
                resolve(response);
            } else {
                showNotification("Failed", "error");
                reject(response.message); 
            }
        }, (error) => {
            showNotification("Serivce error", "error");
            reject(error);
        });
    });
}

// Toggle Heartbeat Monitoring
async function toggleHbMon() {
    try {
        const service = hbmonState.value
            ? '/safety/cfg_hbmon_off'
            : '/safety/cfg_hbmon_on';
        
        await callService(service, 'std_srvs/srv/Trigger');

        hbmonState.value = !hbmonState.value;
    } catch (error) {
        console.error("Error toggling HB Mon: ", error);
    }
}

// Toggle Software Emergency Stop
async function toggleSwes() {
    try {
        const service = swesState.value
            ? '/safety/cfg_swes_off'
            : '/safety/cfg_swes_on';
        
        await callService(service, 'std_srvs/srv/Trigger');

        swesState.value = !swesState.value;
    } catch (error) {
        console.error("Error toggling SW ES: ", error);
    }
}

// Show notification
function showNotification(message, type) {
    notification.value = { message, type };
    
    // Clear notification after 3 sec
    setTimeout(() => {
        notification.value = { message: '', type: '' };
    }, 2000);
}

const subscribe = () => {
    const safetyStateTopic = new ROSLIB.Topic({
        ros: rosStore.ros,
        name: "/safety/status",
        messageType: "std_msgs/msg/String"
    });

    safetyStateTopic.subscribe((msg) => {
        safetyState.value = parseStatusMessage(msg.data);
        updateUnlockButtonColor(safetyState.value);
    });
}

onMounted(() => {
    subscribe();
});
</script>

<style lang="css" scoped>
.safety-control {
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
    height: 100%;
    width: 100%;
}

.control-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

.button-group {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}

.control-btn {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}

.control-btn:active {
    transform: translateY(1px);
}

.reset-btn {
    background-color: color-mix(in srgb, var(--p-orange-500) 40%, transparent);
    color: var(--p-orange-200);
    border: 2px solid var(--p-orange-500);
}

.hb-btn {
    background-color: color-mix(in srgb, var(--p-slate-500) 40%, transparent);
    color: var(--p-slate-300);
    border: 2px solid var(--p-slate-500);
}

.swes-btn {
    background-color: color-mix(in srgb, var(--p-slate-500) 40%, transparent);
    color: var(--p-slate-300);
    border: 2px solid var(--p-slate-500);
}

.status-btn {
    color: var(--text-color);
}

.lock {
    background-color: color-mix(in srgb, var(--p-red-950) 30%, transparent);
    color: var(--p-red-500);
    border: 2px solid var(--p-red-900);
}
.unlock {
    background-color: var(--p-green-950);
    color: var(--p-emerald-400);
    border: 2px solid var(--p-emerald-900);
}

.notification {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    animation: fadeInOut 3.5s ease;
}

.notification.success {
    background-color: var(--green);
    color: white;
}

.notification.error {
    background-color: var(--red);
    color: white;
}

@keyframes fadeInOut {
    0%, 100% { opacity: 0; bottom: 0; }
    10%, 90% { opacity: 1; bottom: 1rem; }
}
</style>