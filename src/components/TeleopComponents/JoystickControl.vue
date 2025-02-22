<template>
    <div id="zone_joystick" class="zone static"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import nipplejs from "nipplejs";

export default {
    emits: ["joystickUpdate", "joystickStart", "joystickEnd", "toggleLight"],
    props: {
        lin_max_speed: Number,
        ang_max_speed: Number,
    },
    setup(props, { emit }) {
        let joystick = null;
        const lin_speed = ref(0);
        const ang_speed = ref(0);
        const decay_step = 0.1;
        let speed_decay_interval = null;

        const setupJoystick = () => {
            joystick = nipplejs.create({
                zone: document.getElementById("zone_joystick"),
                mode: "static",
                color: "black",
                position: { left: "50%", right: "50%", top: "50%" },
                size: 200
            });

            joystick.on("start", () => {
                emit("joystickStart");
            });

            joystick.on("move", (_, data) => {
                let direction = null;

                lin_speed.value = Math.round(
                    Math.min(
                        Math.max(data.vector.y * (props.lin_max_speed * 0.75) * 0.5 * data.force, -props.lin_max_speed), 
                        props.lin_max_speed
                    ) * 100
                ) / 100;

                if (data.vector.x < -0.1) {
                    direction = "left";
                } else if (data.vector.x > 0.1) {
                    direction="right"
                }

                if (direction) {
                    emit("toggleLight", "rotate", direction);
                } else {
                    emit("toggleLight", "rotate", "stop");
                }
      
                // Если lin_speed отрицательна, меняем знак у ang_speed
                if (lin_speed.value < -0.15) { 
                    ang_speed.value = Math.round(
                        Math.min(
                            Math.max(data.vector.x * (props.ang_max_speed * 0.75) * 0.5 * data.force, -props.ang_max_speed),
                            props.ang_max_speed
                        ) * 100
                    ) / 100;
                } else {
                    ang_speed.value = -Math.round(
                        Math.min(
                            Math.max(data.vector.x * (props.ang_max_speed * 0.75) * 0.5 * data.force, -props.ang_max_speed), 
                            props.ang_max_speed
                        ) * 100
                    ) / 100;
                }

                emit("joystickUpdate", { lin_speed: lin_speed.value, ang_speed: ang_speed.value });
                // console.debug(lin_speed.value);
                console.debug(ang_speed.value);
            });

            joystick.on("end", () => {
                if (!speed_decay_interval) {
                    speed_decay_interval = setInterval(() => {
                        lin_speed.value = reduce_speed(lin_speed.value, 0);
                        ang_speed.value = reduce_speed(lin_speed.value, 0);

                        if (lin_speed.value === 0 && ang_speed.value === 0) {
                            clearInterval(speed_decay_interval);
                            speed_decay_interval = null;
                        }

                        emit("joystickUpdate", { lin_speed: lin_speed.value, ang_speed: ang_speed.value });
                    }, 100);
                }

                emit("joystickEnd");
            });
        };

        const reduce_speed = (current, target) => {
            if (Math.abs(current - target) <= decay_step) return target;
            return current > target ? current - decay_step : current + decay_step;
        };

        onMounted(setupJoystick);
        onUnmounted(() => joystick?.destroy());

        return { lin_speed, ang_speed };
    }
}
</script>
<style scoped>
.zone {
  position: relative;
  width: 200px;
  height: 200px;
}

@media (max-width: 896px) {
    .zone {
        width: 135px;
        height: 135px;
  }
}
</style>