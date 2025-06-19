<template>
    <button id="unlockBtn" @click="sendUnblockCommand()" class="safety-unlock" :class="updateUnlockButtonColor(safetyState)">
        Safety {{ safetyState }}
    </button>
    <div class="main">
        <div class="power-monitor">
            <h2>DC</h2>
            <div class="cards">
                <div class="card">
                    <p class="label">U-OUT</p>
                    <p class="value" :class="getColor(u_out, 10, 30)">{{ u_out }} V</p>
                </div>
                <div class="card">
                    <p class="label">I-OUT</p>
                    <p class="value" :class="getColor(i_out, 5, 15)">{{ i_out }} A</p>
                </div>
                <div class="card">
                    <p class="label">POWER</p>
                    <p class="value" :class="getColor(power, 50, 200)">{{ power }} W</p>
                </div>
                <div class="card">
                    <p class="label">U-IN</p>
                    <p class="value" :class="getColor(u_in, 10, 50)">{{ u_in }} V</p>
                </div>
            </div>
        </div>
        <div class="light-monitor">
            <h2>Свет</h2>
            <div class="cards">
                <div 
                    v-for="(light, index) in lights"
                    :key="index"
                    class="card"
                    :class="getStatusClass(light.status)"
                    @click="toggleLight(light)"
                >
                    <p class="label">{{ light.device }}</p>
                    <p class="status">{{ formatStatus(light.status, light.value) }}</p>
                </div>
            </div>
        </div>
        <div class="vesc-monitor">
            <h2>VESC</h2>
            <div class="vesc-table-container">
                <table class="vesc-table">
                    <thead>
                        <tr>
                            <th>Показатель</th>
                            <th v-for="(data, id) in vescData" :key="id">Controller {{ id }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="key in parameterKeys" :key="key">
                            <td>{{ key }}</td>
                            <td v-for="(data, id) in vescData" :key="id">
                                {{ data[key] ?? '-' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="log-monitor">
            <h2>Log's</h2>
            <div class="log-controls">
                <button @click="clearLogs()">Очистить</button>
                <label>
                    <input type="checkbox" v-model="autoScroll" /> Автопрокрутка
                </label>
                <div class="filter-controls">
                    <label v-for="level in logLevels" :key="level.value">
                        <input type="checkbox" v-model="logFilters" :value="level.value"/>
                        <span :class="level.class">{{ level.label }}</span>
                    </label>
                </div>
            </div>
            <div class="log-console" ref="consoleRef">
                <table class="log-table">
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Уровень</th>
                            <th>Сообщение</th>
                            <th>Узел</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(log, index) in filteredLogs"
                            :key="index"
                            :class="log.levelClass"
                        >
                            <td>{{ formatLogTime(log.stamp) }}</td>
                            <td>{{ log.levelText }}</td>
                            <td>{{ log.msg }}</td>
                            <td>{{ log.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from "roslib";

export default {
    setup() {
        const rosStore = useRosStore();
        const u_out = ref(0);
        const i_out = ref(0);
        const power = ref(0);
        const u_in = ref(0);
        const safetyState = ref(null);
        const vescData = ref({});

        const lights = ref([]);

        const logs = ref([]);
        const autoScroll = ref(true);
        const consoleRef = ref(null);
        const logFilters = ref([20, 30, 40]); // Default: INFO, WARN, ERROR

        const logLevels = ref([
            { value: 10, label: "DEBUG", class: "debug" },
            { value: 20, label: "INFO", class: "info" },
            { value: 30, label: "WARN", class: "warn" },
            { value: 40, label: "ERROR", class: "error" },
            { value: 50, label: "FATAL", class: "fatal" }
        ]);

        let topics = [];
        const wheelNames = ["fl", "fr", "rl", "rr"]

        const subscribeToTopics = () => {
            if(!rosStore.ros) {
                console.error("no connect to ros");
                return;
            }

            const logTopic = new ROSLIB.Topic({
                ros: rosStore.ros,
                name: "/rosout",
                messageType: "rcl_interfaces/msg/Log"
            });

            logTopic.subscribe((msg) => {
                const levelText = logLevels.value.find(l => l.value === msg.level)?.label || msg.level;
                const levelClass = logLevels.value.find(l => l.value === msg.level)?.class || "";

                logs.value.push({
                    ...msg,
                    levelText,
                    levelClass,
                    receivedAt: new Date()
                });

                // Ограничиваем размер логов
                if (logs.value.length > 1000) {
                    logs.value.splice(0, 200);
                }
            });

            topics.push(logTopic);

            wheelNames.forEach((wheel) => {
                const vescState = new ROSLIB.Topic({
                    ros: rosStore.ros,
                    name: `/vesc/state/${wheel}`,
                    messageType: "mcu_msgs/msg/VescState",
                });

                vescState.subscribe((msg) => {
                    vescState.value[wheel.toUpperCase()] = {
                        "Темп. FET": `${msg.temp_fet.toFixed(1)} °C`,
                        "Темп. мотора": `${msg.temp_motor.toFixed(1)} °C`,
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
                        "NTC MOS 1": `${msg.ntc_temp_mos1.toFixed(1)} °C`,
                        "NTC MOS 2": `${msg.ntc_temp_mos2.toFixed(1)} °C`,
                        "NTC MOS 3": `${msg.ntc_temp_mos3.toFixed(1)} °C`,
                        "Fault code": msg.fault_code
                    };
                });

                topics.push(vescState);
            })

            const safetyStateTopic = new ROSLIB.Topic({
                ros: rosStore.ros,
                name: "/safety/status",
                messageType: "std_msgs/msg/String"
            });

            safetyStateTopic.subscribe((msg) => {
                safetyState.value = parseStatusMessage(msg.data);
                updateUnlockButtonColor(safetyState.value);
            });
            topics.push(safetyStateTopic);

            const lightStateTopic = new ROSLIB.Topic({
                ros: rosStore.ros,
                name: "/light_state",
                messageType: "mcu_msgs/msg/LightState",
            });

            lightStateTopic.subscribe((msg) => {
                lights.value = msg.devices.map((device, index) => ({
                    device,
                    status: msg.statuses[index],
                    value: msg.values[index] ?? 0,
                }));
            });
            topics.push(lightStateTopic);

            const topicNames = [
                { name: "/dc/u_out", ref: u_out },
                { name: "/dc/i_out", ref: i_out },
                { name: "/dc/power", ref: power },
                { name: "/dc/u_in", ref: u_in },
            ];

            topicNames.forEach(({ name, ref }) => {
                const topic = new ROSLIB.Topic({
                    ros: rosStore.ros,
                    name,
                    messageType: "std_msgs/msg/Float32",
                });

                topic.subscribe((msg) => {
                    ref.value = msg.data.toFixed(2);
                });

                topics.push(topic);
            });
        };

        // Фильтрация логов
        const filteredLogs = computed(() => {
            return logs.value.filter(log => 
                logFilters.value.includes(log.level)
            );
        });

        // Форматирование времени
        const formatLogTime = (stamp) => {
            if (!stamp) return '';
            const totalSeconds = stamp.sec + stamp.nanosec / 1e9;
            const date = new Date(totalSeconds * 1000);
            return date.toLocaleTimeString();
        };

        // Очистка логов
        const clearLogs = () => {
            logs.value = [];
        };

         // Автопрокрутка
        watch(filteredLogs, async () => {
            if (autoScroll.value) {
                await nextTick();
                if (consoleRef.value) {
                    consoleRef.value.scrollTop = consoleRef.value.scrollHeight;
                }
            }
        });

        const parseStatusMessage = (status) => {
            if (status.includes("F_STATUS_INIT_LOCK") ||
                status.includes("F_STATUS_SW_LOCK") ||
                status.includes("F_STATUS_HW_LOCK") ||
                status.includes("F_STATUS_NOCON_LOCK")) {
                return "locked";
            } else if (status.includes("F_STATUS_NORMAL") || status.includes("F_STATUS_NORMAL_INH")) {
                return "unlocked";
            } else {
                return "unknown";
            };
        }

        const updateUnlockButtonColor = (status) => {
            if (status === "locked") return "lock";
            if (status === "unlocked") return "unlock";
            return "unknown";
        }

        const sendUnblockCommand = () => {
            if(!rosStore.ros) {
                console.error("no connect to ros");
                return;
            }

            var unlock = new ROSLIB.Service({
                ros: rosStore.ros,
                name: "/safety/unlock",
                serviceType: "std_srvs/srv/Trigger"
            });

            const request = new ROSLIB.ServiceRequest({});
            
            unlock.callService(request);
        }

        onMounted(subscribeToTopics);
        onUnmounted(() => {
            topics.forEach(
                (topic) => topic.unsubscribe()
            );
        });

        const getColor = (value, low, high) => {
            if (value < low) return "low";
            if (value > high) return "high";
            return "normal";
        };

        const getStatusClass = (status) => {
            switch (status) {
                case "ON":
                    return "on";
                case "BLK":
                    return "blink";
                case "OFF":
                default:
                    return "off";
            }
        }

        const formatStatus = (status, value) => {
            if (status === "BLK") return `Мигает`;
            if (status === "ON") return `Включен`;
            return "Выключен";
        }

        const toggleLight = (light) => {
            if (!rosStore.ros) {
                console.error("no connect to ros");
                return;
            }

            const newState = light.status === "OFF" ? "ON" : "OFF";
            const command = `C_${light.device}_${newState}`
            const parameter = newState === "ON" ? "255": "0";

            const lightService = new ROSLIB.Service({
                ros: rosStore.ros,
                name: "/control_light",
                serviceType: "mcu_msgs/srv/LightControl"
            });

            const request = new ROSLIB.ServiceRequest({
                command,
                parameter
            });

            lightService.callService(request, (response) => {
                if (response.success) {
                    console.debug("Light command success", response.feedback);
                } else {
                    console.error("Light command error", response.feedback);
                }
            });

        }

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

        return { 
            u_out, 
            i_out, 
            power, 
            u_in, 
            getColor, 
            lights, 
            vescData, 
            getStatusClass, 
            formatStatus, 
            sendUnblockCommand, 
            updateUnlockButtonColor, 
            safetyState, 
            parameterKeys,
            logs,
            filteredLogs,
            logLevels,
            logFilters,
            autoScroll,
            consoleRef,
            formatLogTime,
            clearLogs,
            toggleLight
        };
    },
};
</script>

<style scoped>
p {
    margin: 0;
}
.main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}
.power-monitor {
    max-width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
}
.light-monitor {
    max-width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
}
.vesc-monitor {
    max-width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
    grid-column: span 2;
}
.log-monitor {
    grid-column: span 2;
    background-color: var(--grey6);
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1rem;
}
.log-console {
    max-height: 400px;
    overflow-y: auto;
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 10px;
    font-family: monospace;
    margin-top: 10px;
}
.log-table {
  width: 100%;
  border-collapse: collapse;
  color: #d4d4d4;
}

.log-table th {
  position: sticky;
  top: 0;
  background-color: #2d2d2d;
  padding: 8px;
  text-align: left;
}

.log-table td {
  padding: 6px 8px;
  border-bottom: 1px solid #3c3c3c;
}

.log-controls {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 10px;
}

.filter-controls {
  display: flex;
  gap: 10px;
}

.filter-controls label {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Цвета для уровней логов */
.debug { color: #569cd6; }
.info { color: #4ec9b0; }
.warn { color: #d7ba7d; }
.error { color: #f48771; }
.fatal { color: #ff0000; font-weight: bold; }

tr.debug td { background-color: #1e1e1e; }
tr.info td { background-color: #0a2f0a; }
tr.warn td { background-color: #2f2a0a; }
tr.error td { background-color: #3a0a0a; }
tr.fatal td { background-color: #4a0000; animation: pulse 1s infinite; }

@keyframes pulse {
  0% { background-color: #4a0000; }
  50% { background-color: #6a0000; }
  100% { background-color: #4a0000; }
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
.cards-vesc {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem
}
.vesc-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
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
.card {
    background: var(--grey4);
    padding: .5rem;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
}

.card:hover {
    transform: scale(1.03);
}

.card:active {
    filter: brightness(0.9);
}
.label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}
.value {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0;
}

/* Цветовая индикация */
.low {
    color: var(--blue);
}
.normal {
    color: var(--green);
}
.high {
    color: var(--red);
}
.on {
    background-color: var(--green);
    color: var(--text-color);
}
.off {
    background-color: var(--grey4);
    color: var(--grey2);
}
.blink {
    background-color: var(--orange);
    color: var(--text-color);
    animation: blink 1s infinite alternate;
}
.lock {
    background-color: var(--red);
    color: var(--text-color);
}
.unlock {
    background-color: var(--green);
    color: var(--text-color);
}
.safety-unlock {
    outline: none;
    border: none;
    /* background-color: var(--grey4); */
    /* color: var(--text-color); */
    padding: .75rem 1.5rem;
    border-radius: 12px;
    margin: 1rem;
    transition: all 0.5s;
}
.safety-unlock:active {
    filter: brightness(0.5);
}
@keyframes blink {
    from { opacity: 1; }
    to { opacity: 0.5; }
}
</style>