<template>
    <div class="danger-zone">
        <button :class="['unlock-button', !dangerZoneUnlocked ? 'lidar-on' : 'lidar-off']" @click="toggleDangerZone">
            <i class="bi" :class="!dangerZoneUnlocked ? 'bi-lock-fill': 'bi-unlock'"></i>
        </button>

        <h2 class="danger-text">Опасная зона</h2>
        <div v-if="dangerZoneUnlocked" class="danger-zone-content">
            <div class="lidar-control">
                <button 
                    @click="toggleLidarMode"
                    :class="['lidar-toggle', lidarMode === 1 ? 'lidar-on' : 'lidar-off']"
                    :disabled="lidarHandle === null"
                >
                    {{ lidarMode === 1 ? 'Выключить лидар': 'Включить лидар' }}
                </button>
                <p :class="['lidar-toggle', lidarMode === 2 ? 'lidar-on' : 'lidar-off']">Состояние лидара: {{ lidarStatusText }}</p>
            </div>

            <SafetyConf class="safety-item"></SafetyConf>
        </div>
        <div v-else class="danger-zone-locked">
            <p>Необходимо разблокировать для доступа</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from 'roslib';
import SafetyConf from './SafetyConf.vue';

const rosStore = useRosStore();

const dangerZoneUnlocked = ref(false);
const lidarHandle = ref(null);
const lidarMode = ref(null); // 1 = Normal, 2 = Standby
const lidarStatusText = computed(() => {
        if (lidarMode.value === 1) return 'Normal (включен)';
        if (lidarMode.value === 2) return 'Standby (выключен)';
        return 'Неизвестно';
});

const toggleDangerZone = () => {
    dangerZoneUnlocked.value = !dangerZoneUnlocked.value;
};

const toggleLidarMode = () => {
    if (!rosStore.ros || lidarHandle.value === null) {
        return;
    } 

    const newMode = lidarMode.value === 1 ? 2 : 1;

    const lidarService = new ROSLIB.Service({
        ros: rosStore.ros,
        name: "set_work_mode",
        serviceType: "livox_ros_driver2/srv/SetWorkMode"
    });

    const request = new ROSLIB.ServiceRequest({
        handle: lidarHandle.value,
        mode: newMode
    });

    lidarService.callService(request, (response) => {
        if (response.success) {
            console.debug("WorkMode has been changed");
            lidarMode.value = newMode;
        } else {
            console.error("Error with changed WorkMode");
        }
    });
};

const subscribeToLidarStatus = () => {
    if (!rosStore.ros) {
        return;
    };

    const lidarStatusTopic = new ROSLIB.Topic({
        ros: rosStore.ros,
        name: "/lidar_status",
        messageType: "livox_ros_driver2/msg/LidarStatus"
    });

    lidarStatusTopic.subscribe((msg) => {
        try {
            const data = msg;
            lidarHandle.value = data.handle;
            lidarMode.value = data.mode;
        } catch (e) {
            console.error("Error parsing: ", e);
        }
    })
};

onMounted(() => {
    subscribeToLidarStatus();
});

onUnmounted(() => {
    
})

</script>

<style scoped>
.danger-zone {
    background-color: var(--grey6);
    border-radius: 12px;
    display: flex;
    padding: 1.5rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.danger-text {
    color: var(--p-red-500)
}

.unlock-button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    margin: 8px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .bi {
        font-size: 1.5rem;
    }
}

.danger-zone-content {
    padding: 1rem;
    height: 100%;
    width: 100%;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.safety-item {
    grid-column: 3;
}

.danger-zone-locked {
    color: var(--grey2);
    margin-top: 1rem;
}

.lidar-control {
    column-span: 2;
}

.lidar-toggle {
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    margin-top: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
}

.lidar-on {
    background-color: color-mix(in srgb, var(--p-red-950) 30%, transparent);
    color: var(--p-red-500);
    border: 2px solid var(--p-red-900);
}

.lidar-off {
    background-color: var(--p-green-950);
    color: var(--p-emerald-400);
    border: 2px solid var(--p-emerald-900);
}

.lidar-toggle:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>