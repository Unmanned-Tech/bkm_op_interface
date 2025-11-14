<template>
    <div class="vesc-monitor">
        <h2>Контроллеры привода</h2>
        <div class="vesc-table-container position-relative">
            <table class="vesc-table">
                <thead>
                    <tr>
                        <th>Показатель</th>
                        <th v-for="(data, id) in vescData" :key="id">Контроллер {{ id }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(key, rowIndex) in parameterKeys" :key="key">
                        <td>{{ key }}</td>

                        <!-- Для каждого контроллера -->
                        <template v-for="(data, id) in vescData" :key="id">
                            <td v-if="isControllerConnected(id)" v-html="data[key] ?? '-'"></td>

                            <td
                                v-else-if="rowIndex === 0"
                                :rowspan="parameterKeys.length"
                                class="not-connected-cell"
                            >
                                Не подключено
                            </td>

                            <td v-else v-show="false"></td>
                        </template>
                    </tr>
                </tbody>
            </table>
            <i class="bi bi-arrow-down position-absolute bottom-0 end-0 p-2"></i>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { useRosStore } from "@/stores/ConfigStore";

const rosStore = useRosStore();
let topics = [];

const vescData = ref({});
const lastUpdateTimes = ref({});
const wheelNames = ["fl", "fr", "rl", "rr", "additional"];
const checkInterval = ref(null);

const isControllerConnected = (controllerId) => {
    const lastUpdate = lastUpdateTimes.value[controllerId];
    if (!lastUpdate) return false;
    
    return (Date.now() - lastUpdate) < 2000;
};

const parameterKeys = [
    "Темп. FET",
    "Темп. мотора",
    "Ток мотора",
    "Ток входной",
    "Напряжение",
    "Duty cycle",
    "Скорость",
    "Заряд (drawn)",
    "Заряд (regen)",
    "Энергия (drawn)",
    "Энергия (regen)",
    "Tacho",
    "Tacho abs",
    "avg_id",
    "avg_iq",
    "avg_vd",
    "avg_vq",
    "NTC MOS 1",
    "NTC MOS 2",
    "NTC MOS 3",
    "Fault code",
];

const subscribe = () => {
    if(!rosStore.ros) {
        console.error("no connect to ros");
        return;
    }

    wheelNames.forEach((wheel) => {
        const wheelKey = wheel.toUpperCase();
        
        vescData.value[wheelKey] = {};
        lastUpdateTimes.value[wheelKey] = 0;

        const vescState = new ROSLIB.Topic({
            ros: rosStore.ros,
            name: `/vesc/state/${wheel}`,
            messageType: "mcu_msgs/msg/VescState",
        });

        vescState.subscribe((msg) => {
            lastUpdateTimes.value[wheelKey] = Date.now();

            vescData.value[wheelKey] = {
                "Темп. FET": `${msg.temp_fet.toFixed(1)} &deg;C`,
                "Темп. мотора": `${msg.temp_motor.toFixed(1)} &deg;C`,
                "Ток мотора": `${msg.current_motor.toFixed(2)} A`,
                "Ток входной": `${msg.current_input.toFixed(2)} A`,
                "Напряжение": `${msg.voltage_input.toFixed(2)} V`,
                "Duty cycle": `${(msg.duty_cycle * 100).toFixed(1)} %`,
                "Скорость": `${msg.speed} об/мин`,
                "Заряд (drawn)": `${msg.charge_drawn.toFixed(2)} А·ч`,
                "Заряд (regen)": `${msg.charge_regen.toFixed(2)} А·ч`,
                "Энергия (drawn)": `${msg.energy_drawn.toFixed(2)} Вт·ч`,
                "Энергия (regen)": `${msg.energy_regen.toFixed(2)} Вт·ч`,
                "Tacho": msg.displacement,
                "Tacho abs": msg.distance_traveled,
                "avg_id": msg.avg_id.toFixed(2),
                "avg_iq": msg.avg_iq.toFixed(2),
                "avg_vd": msg.avg_vd.toFixed(2),
                "avg_vq": msg.avg_vq.toFixed(2),
                "NTC MOS 1": `${msg.ntc_temp_mos1.toFixed(1)} &deg;C`,
                "NTC MOS 2": `${msg.ntc_temp_mos2.toFixed(1)} &deg;C`,
                "NTC MOS 3": `${msg.ntc_temp_mos3.toFixed(1)} &deg;C`,
                "Fault code": msg.fault_code
            };
        });

        topics.push(vescState);
    });
};

const checkControllersConnection = () => {
    lastUpdateTimes.value = {...lastUpdateTimes.value};
};

onMounted(() => {
    subscribe();

    checkInterval.value = setInterval(checkControllersConnection, 1000);
});
onUnmounted(() => {
    topics.forEach((topic) => topic.unsubscribe());
    clearInterval(checkInterval.value);
});

</script>

<style scoped>
p {
    margin: 0;
}

h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--text-color)
}

.cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
}

.vesc-table-container {
    overflow-y: auto;
    max-height: 300px;
    border-radius: 12px;
}

.vesc-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}
.vesc-monitor {
    max-width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
    grid-column: span 2;
}
table tr:last-child td:first-child {
    border-bottom-left-radius: 12px;
}
table tr:last-child td:last-child {
    border-bottom-right-radius: 12px;
}

table tr:first-child th:first-child {
    border-top-left-radius: 12px;
}

table tr:first-child th:last-child {
    border-top-right-radius: 12px;
}

.vesc-table th,
.vesc-table td {
    border: 1px solid var(--grey4);
    padding: 8px 12px;
    text-align: center;
}

.vesc-table th {
    background-color: var(--grey5);
}

.not-connected-cell {
    color: var(--p-red-500);
    font-weight: bold;
    background-color: color-mix(in srgb, var(--p-red-950) 30%, transparent);
    vertical-align: top;
    font-size: 1.2rem;
    padding: 0 !important;
    padding-top: 1rem !important;
}
</style>