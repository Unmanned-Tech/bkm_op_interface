<template>
    <SafetyUnlockButton class="safety-unlock-main" />
    <div class="main">
        <grid-layout 
            v-model:layout="layout"
            :row-height="2"
            :is-draggable="true"
            :is-resizable="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            class="vue-grid-layout"
        >
            <grid-item :x="layout[0].x" :y="layout[0].y" :w="layout[0].w" :h="layout[0].h" :i="layout[0].i" :minW="layout[0].minW" :minH="layout[0].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".power-monitor">
                <i class="vue-draggable-handle bi bi-grip-horizontal"></i>
                <div class="power-monitor no-drag">
                    <h2>Питание электроники (DC-DC)</h2>
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
            </grid-item>
            <grid-item :x="layout[1].x" :y="layout[1].y" :w="layout[1].w" :h="layout[1].h" :i="layout[1].i" :minW="layout[1].minW" :minH="layout[1].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle bi bi-grip-horizontal"></i>
                <div class="light-monitor no-drag">
                    <h2>Управление светом</h2>
                    <div class="cards">
                        <div 
                            v-for="(light, index) in lights"
                            :key="index"
                            class="card"
                            :class="getStatusClass(light.status)"
                            @click="toggleLight(light)"
                        >
                            <p class="label">{{ light.label }}</p>
                            <p class="status">{{ formatStatus(light.status, light.value) }}</p>
                        </div>
                    </div>
                </div>
            </grid-item>
            <grid-item :x="layout[2].x" :y="layout[2].y" :w="layout[2].w" :h="layout[2].h" :i="layout[2].i" :minW="layout[2].minW" :minH="layout[2].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle bi bi-grip-horizontal"></i>
                <VESCMonitor class="no-drag"/>
            </grid-item>
            <grid-item :x="layout[3].x" :y="layout[3].y" :w="layout[3].w" :h="layout[3].h" :i="layout[3].i" :minW="layout[3].minW" :minH="layout[3].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle bi bi-grip-horizontal"></i>
                <BMSMonitorLeft class="no-drag" />
            </grid-item>
            <grid-item :x="layout[4].x" :y="layout[4].y" :w="layout[4].w" :h="layout[4].h" :i="layout[4].i" :minW="layout[4].minW" :minH="layout[4].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle bi bi-grip-horizontal"></i>
                <BMSMonitorRight class="no-drag" />
            </grid-item>
            <grid-item :x="layout[5].x" :y="layout[5].y" :w="layout[5].w" :h="layout[5].h" :i="layout[5].i" :minW="layout[5].minW" :minH="layout[5].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle bi bi-grip-horizontal" style="left: 50% !important"></i>
                <SafetyModules class="no-drag" />
            </grid-item>
            <grid-item :x="layout[6].x" :y="layout[6].y" :w="layout[6].w" :h="layout[6].h" :i="layout[6].i" :minW="layout[6].minW" :minH="layout[6].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle-right" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle-right bi bi-grip-horizontal"></i>
                <div class="log-monitor no-drag">
                    <h2>Журнал</h2>

                    <div class="log-tabs">
                        <button 
                            v-for="node in nodeTabs"
                            :key="node.name"
                            @click="selectNode(node.name)"
                            :class="{ active: selectedNode === node.name, 'has-error': hasErrorLogs(node.name) }"
                            class="tab-button"
                        >
                            {{ node.label }}
                            <span v-if="node.unreadCount > 0" class="unread-badge">{{ node.unreadCount }}</span>
                        </button>
                    </div>

                    <div class="log-controls">
                        <button class="clear-logs" @click="clearLogs()">Очистить</button>
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
                                    v-for="(log, index) in displayedLogs"
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
            </grid-item>

            <grid-item :x="layout[7].x" :y="layout[7].y" :w="layout[7].w" :h="layout[7].h" :i="layout[7].i" :minW="layout[7].minW" :minH="layout[7].minH" class="vue-grid-item" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                <i class="vue-draggable-handle bi bi-grip-horizontal"></i>
                <DangerZone class="no-drag"></DangerZone>
            </grid-item>
            
        </grid-layout>
        
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from "roslib";
import BMSMonitorLeft from "./LogsComponents/BMSMonitorLeft.vue";
import BMSMonitorRight from "./LogsComponents/BMSMonitorRight.vue";
import VESCMonitor from "./LogsComponents/VESCMonitor.vue";
import SafetyModules from "./LogsComponents/SafetyModules.vue";
import SafetyConf from "./LogsComponents/SafetyConf.vue";
import DangerZone from "./LogsComponents/DangerZone.vue";
import { GridLayout, GridItem } from 'vue-grid-layout-v3';
import { debounce } from "lodash-es";

import SafetyUnlockButton from "./SafetyUnlockButton.vue";

export default {
    components: {
        BMSMonitorLeft,
        BMSMonitorRight,
        VESCMonitor,
        SafetyModules,
        SafetyConf,
        DangerZone,
        GridLayout,
        GridItem,
        SafetyUnlockButton
    },
    setup() {
        const layout = ref([
            { x: 0, y: 0, w: 6, h: 22, i: "0", minW: 6, minH: 22 }, // Power Monitor
            { x: 6, y: 0, w: 6, h: 22, i: "1", minW: 6, minH: 22 }, // Light Monitor
            { x: 0, y: 1, w: 12, h: 34, i: "2", minW: 12, minH: 34 }, // VESC Monitor
            { x: 0, y: 1, w: 6, h: 30, i: "3", minW: 6, minH: 30 }, // Left BMS Monitor 
            { x: 6, y: 1, w: 6, h: 30, i: "4", minW: 6, minH: 30 }, // Right BMS Monitor
            { x: 0, y: 1, w: 12, h: 22, i: "5", minW: 12, minH: 22 }, // Safety Modules Monitor
            { x: 0, y: 1, w: 12, h: 46, i: "7", minW: 12, minH: 46 }, // Logs
            { x: 8, y: 1, w: 12, h: 20, i: "6", minW: 4, minH: 20 }, // Danger Zone
        ]);
        const rosStore = useRosStore();
        const u_out = ref(0);
        const i_out = ref(0);
        const power = ref(0);
        const u_in = ref(0);

        const lights = ref([
            { device: "HL", label: "Фары", status: "OFF", value: 0 },
            { device: "SL_L", label: "Л.Поворотники", status: "OFF", value: 0 },
            { device: "SL_R", label: "П.Повортники", status: "OFF", value: 0 },
            { device: "FL_L", label: "Л.Стробы", status: "OFF", value: 0 },
            { device: "FL_R", label: "П.Стробы", status: "OFF", value: 0 },
            { device: "DL", label: "Декор. свет", status: "OFF", value: 0 },
            { device: "SS", label: "Стоп-сигнал", status: "OFF", value: 0 },
            { device: "EL", label: "Подсветка", status: "OFF", value: 0 }
        ]);

        const logs = ref([]);
        const autoScroll = ref(true);
        const consoleRef = ref(null);
        const logFilters = ref([30, 40]); // Default: INFO, WARN, ERROR
        const selectedNode = ref("all");

        const logLevels = ref([
            { value: 10, label: "DEBUG", class: "debug" },
            { value: 20, label: "INFO", class: "info" },
            { value: 30, label: "WARN", class: "warn" },
            { value: 40, label: "ERROR", class: "error" },
            { value: 50, label: "FATAL", class: "fatal" }
        ]);

        let topics = [];

        const uniqueNodes = computed(() => {
            const nodes = new Set();
            logs.value.forEach(log => {
                if (log.name) {
                    nodes.add(log.name);
                }
            });
            return Array.from(nodes).sort();
        });

        const nodeTabs = computed(() => {
            const tabs = [
                { 
                    name: "all", 
                    label: "Все", 
                    unreadCount: logs.value.filter(log => 
                        logFilters.value.includes(log.level) && 
                        log.isUnread
                    ).length 
                }
            ];

            uniqueNodes.value.forEach(node => {
                const nodeLogs = logs.value.filter(log => log.name === node);
                tabs.push({
                    name: node,
                    label: node,
                    unreadCount: nodeLogs.filter(log => 
                        logFilters.value.includes(log.level) && 
                        log.isUnread
                    ).length
                });
            });

            return tabs;
        });

        // Отфильтрованные логи с учетом выбранной ноды и уровня
        const displayedLogs = computed(() => {
            let filtered = logs.value.filter(log => 
                logFilters.value.includes(log.level)
            );
            
            if (selectedNode.value !== "all") {
                filtered = filtered.filter(log => log.name === selectedNode.value);
            }
            
            return filtered;
        });

        // Проверка есть ли ошибки для ноды
        const hasErrorLogs = (nodeName) => {
            const nodeLogs = logs.value.filter(log => log.name === nodeName);
            return nodeLogs.some(log => log.level >= 40); // ERROR или FATAL
        };

        // Выбор ноды
        const selectNode = (nodeName) => {
            selectedNode.value = nodeName;
            
            // Помечаем логи как прочитанные при переключении на вкладку
            if (nodeName === "all") {
                logs.value.forEach(log => {
                    if (logFilters.value.includes(log.level)) {
                        log.isUnread = false;
                    }
                });
            } else {
                logs.value.forEach(log => {
                    if (log.name === nodeName && logFilters.value.includes(log.level)) {
                        log.isUnread = false;
                    }
                });
            }
        };

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
                if (logs.value.length > 500) {
                    logs.value.splice(0, 100);
                }
            });

            topics.push(logTopic);

            const lightStateTopic = new ROSLIB.Topic({
                ros: rosStore.ros,
                name: "/light_state",
                messageType: "mcu_msgs/msg/LightState",
            });

            const updateLights = debounce((msg) => {
                lights.value = msg.devices.map((device, index) => {
                    const oldLight = lights.value.find(l => l.device === device);
                    return {
                        device,
                        label: oldLight?.label,
                        status: msg.statuses[index],
                        value: msg.values[index] ?? 0
                    }
                })
            }, 200);

            lightStateTopic.subscribe((msg) => {
                updateLights(msg);
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

        // Форматирование времени
        const formatLogTime = (stamp) => {
            if (!stamp) return '';
            const totalSeconds = stamp.sec + stamp.nanosec / 1e9;
            const date = new Date(totalSeconds * 1000);
            return date.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
        };

        // Очистка логов
        const clearLogs = () => {
            if (selectedNode.value === "all") {
                logs.value = [];
            } else {
                logs.value = logs.value.filter(log => log.name !== selectedNode.value);
            }
        };

        // Автопрокрутка
        watch(displayedLogs, async () => {
            if (autoScroll.value) {
                await nextTick();
                if (consoleRef.value) {
                    consoleRef.value.scrollTop = consoleRef.value.scrollHeight;
                }
            }
        });

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
            if (status === "BLK") return `blink`;
            if (status === "ON") return `Вкл`;
            return "Выкл";
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


        return {
            u_out, 
            i_out, 
            power, 
            u_in, 
            getColor, 
            lights, 
            getStatusClass, 
            formatStatus, 
            logs,
            displayedLogs,
            logLevels,
            logFilters,
            autoScroll,
            consoleRef,
            formatLogTime,
            clearLogs,
            nodeTabs,
            selectedNode,
            selectNode,
            hasErrorLogs,
            toggleLight,
            layout
        };
    },
};
</script>

<style scoped>
.safety-unlock-main {
    position: relative;
    z-index: 100;
}

p {
    margin: 0;
}
.vue-grid-layout {
    max-width: 100%;
    height: 100%;
    background: transparent;
}
.vue-draggable-handle {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    top: 0;
    left: 0;
    margin: 8px;
    font-size: 2rem;
}
.vue-draggable-handle-right {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    margin: 8px;
    font-size: 2rem;
}
.power-monitor,
.light-monitor {
    height: 100%;
    width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    text-align: center;
    box-sizing: border-box;
}
.log-monitor {
    height: 100%;
    width: 100%;
    padding: 1.5rem;
    background-color: var(--grey6);
    border-radius: 12px;
    box-sizing: border-box;
}
.log-console {
    max-height: 340px;
    overflow-y: auto;
    background-color: #1e1e1e;
    border-radius: 12px;
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
    flex-wrap: wrap;
}

.log-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 15px;
    background-color: var(--grey5);
    border-radius: 8px;
    padding: 4px;
    overflow-x: auto;
}

.tab-button {
    flex: 1;
    min-width: 120px;
    padding: 10px 15px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    color: var(--text-color);
    font-size: 0.9rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
}

.tab-button:hover {
    background-color: var(--grey4);
}

.tab-button.active {
    background-color: var(--grey6);
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.tab-button.has-error {
    color: var(--red);
    border-right: 3px solid var(--red);
}

.tab-button.has-error.active {
    background-color: color-mix(in srgb, var(--red) 20%, var(--grey6));
}

.unread-badge {
    background-color: var(--blue);
    color: white;
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 0.8rem;
    min-width: 20px;
    text-align: center;
}

.tab-button.has-error .unread-badge {
    background-color: var(--red);
}

.filter-controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-controls label {
    display: flex;
    align-items: center;
    gap: 4px;
}

.clear-logs {
    background-color: color-mix(in srgb, rgba(14,165,233,1.0) 16%, transparent);
    color: var(--p-sky-300);
    border: 2px solid var(--p-sky-900);
    border-radius: 12px;
    padding: .25rem 1rem;
    cursor: pointer;
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
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
}

.card {
    background: var(--grey4);
    padding: .5rem;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;
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

.light-monitor > .cards > .card:active {
    filter: brightness(0.7);
}
.label {
    font-size: 0.85rem;
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

@media screen and (max-width: 968px) {
    .power-monitor :deep(.label) {
        font-size: 1.0rem;
    }

    .power-monitor :deep(.value) {
        font-size: 1.2rem;
    }

    .power-monitor .cards {
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    }

    .light-monitor .cards {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
}
</style>