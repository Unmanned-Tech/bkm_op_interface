<template>
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
                    <p class="value" :class="getColor(u_in, 10, 30)">{{ u_in }} V</p>
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
                >
                    <p class="label">{{ light.device }}</p>
                    <p class="status">{{ formatStatus(light.status, light.value) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRosStore } from "@/stores/ConfigStore";

export default {
    setup() {
        const rosStore = useRosStore;
        const u_out = ref(0);
        const i_out = ref(0);
        const power = ref(0);
        const u_in = ref(0);

        const lights = ref([]);
        let lightStateTopic = null;

        let topics = [];

        const subscribeToTopics = () => {
            if(!rosStore.ros) {
                console.error("no connect to ros");
                return;
            }

            lightStateTopic = new ROSLIB.Topic({
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

        onMounted(subscribeToTopics);
        onUnmounted(() => {
            topics.forEach((topic) => topic.unsubscribe());
            lightStateTopic?.unsubscribe();
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
            if (status === "BLK") return `Мигает (${value})`;
            if (status === "ON") return `Включен (${value})`;
            return "Выключен";
        }

        return { u_out, i_out, power, u_in, getColor, lights, getStatusClass, formatStatus };
    },
};
</script>

<style scoped>
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
h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--text-color)
}
.cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}
.card {
    background: var(--grey4);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}
.value {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    /* margin-top: 0.5rem; */
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
    color: var(--grey3);
}
.blink {
    background-color: var(--orange);
    color: var(--text-color);
    animation: blink 1s infinite alternate;
}
@keyframes blink {
    from { opacity: 1; }
    to { opacity: 0.5; }
}
</style>