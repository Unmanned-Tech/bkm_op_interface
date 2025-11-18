<template>
  <div class="main">

    <transition name="mic-notification">
      <div v-if="micNotification.show" class="mic-notification" :class="micNotification.type">
        <div class="notification-content">
          <div class="notification-icon">
            <div v-if="micNotification.type === 'connecting'" class="spinner-container">
              <div class="spinner"></div>
            </div>
            <i v-else-if="micNotification.type === 'connected'" class="bi bi-mic-fill success-icon"></i>
            <i v-else-if="micNotification.type === 'error'" class="bi bi-exclamation-triangle-fill error-icon"></i>
          </div>
          <div class="notification-text">
            <span class="notification-title">{{ getNotificationTitle }}</span>
            <span class="notification-message">{{ micNotification.message }}</span>
          </div>
          <div class="notification-actions">
            <button v-if="micNotification.type === 'connected' || micNotification.type === 'error'" 
                    class="close-btn" 
                    @click="hideMicNotification">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        <div v-if="micNotification.type === 'connecting'" class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </transition>

    <!-- <div v-if="micNotification.show" class="mic-notification" :class="micNotification.type">
      <div class="notification-content">
        <div v-if="micNotification.type === 'connecting'" class="spinner"></div>
        <span>{{ micNotification.message }}</span>
        <button v-if="micNotification.type === 'connected'" class="close-btn" @click="hideMicNotification">
          <i class="bi bi-x-circle"></i>
        </button>
      </div>
    </div> -->

    <swiper
      :slidesPerView="1"
      :spaceBetween="0"
      :freeMode="true"
      :modules="modules"
      class="overlay-video"
    >
      <swiper-slide>
        <iframe class="video" scrolling="no" nocontrols :src="camera_0" @load="handleLoad" />
      </swiper-slide>
      <swiper-slide>
        <iframe class="video" scrolling="no" :src="camera_1" @load="handleLoad" />
      </swiper-slide>
    </swiper>
    
    <div class="row">
      <div class="col-auto pe-1 z-1">
        <div class="row slide-out-columnX d-sm-none d-lg-flex" :class="{ 'slide-out-columnX': isMapVisible, mapHide: !isMapVisible }">
          <div class="col pe-0 map-col">
            <Map class="map" />
          </div>
          <div class="col-auto ps-0 d-flex align-items-center">
            <button class="tongue p-lg-2 p-sm-1" @click="toggleMap">
              <div :style="{ transform: isMapVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                <Polygon class="optin-min" />
              </div>
              <i class="bi bi-geo-alt"></i>
            </button>
          </div>
        </div>
        <div class="row my-1 my-lg-2 slide-out-columnX" :class="{ 'slide-out-columnX': isSliderVisible, slideHide: !isSliderVisible }">
          <div class="col-auto pe-0 slide-col">
            <div class="slide p-3 py-1">
              <div v-for="slider in sliders" :key="slider.id" class="slider-wrapper">
                <SliderControl 
                  :id="slider.id"
                  :label="slider.label"
                  v-model="slider.model.value"
                  :min="slider.min"
                  :max="slider.max"
                  :step="slider.step"
                  :unit="slider.unit"
                  :colorStyle="slider.colorStyle"
                  :showValue="slider.showValue"
                  :showLetters="slider.showLetters"
                />
              </div>
            </div>
          </div>
          <div class="col-auto ps-0 d-flex flex-column justify-content-center">
            <button class="tongue" style="background-color: var(--red)" @click="disable_all_sliders()">
              <i class="bi bi-sign-stop"></i>
            </button>
            <button class="tongue p-2 p-sm-1 my-3 my-sm-2" @click="toggleSlider">
              <div :style="{ transform: isSliderVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }" style="transition: all 0.5s;">
                <Polygon class="optin-min" />
              </div>
              <i class="bi bi-sliders"></i>
            </button>
            <button class="tongue" style="background-color: var(--red)" @click="disable_brush_speed()">
              <Brush class="optin-min" />
            </button>
          </div>
        </div>
      </div>
      <div class="col px-0">
        <div class="row mx-0">
          <div class="col overlay-side">
            <vue-draggable-resizable :w="920" :resizable="false" style="background-color: transparent; border: none;">
                <iframe class="side-video-left" scrolling="no" :src="cameras_side" @load="handleLoad" />
            </vue-draggable-resizable>
          </div>
        </div>
      </div>
      <div class="col-auto ps-1 pe-5">
        <div class="row justify-content-end">
          <div class="col-auto z-1">
            <div class="info-grid">
              <InfoCard :value="displayC1Msg" unit="м/с" class="start1" />
              <InfoCard :value="brush_speed" unit="об/м" class="end1" />
              <InfoCard :value="bkmStore.selectedBkm" />
              <InfoCard><Brush /></InfoCard>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-auto py-lg-4 py-2 px-2">
            <EmerStopButton />
          </div>
        </div>
        <div class="row mt-0 mt-lg-4 justify-content-center">
          <JoystickControl 
            :lin_max_speed="lin_max_speed"
            :ang_max_speed="ang_max_speed"
            @joystickUpdate="handleJoystickUpdate"
            @joystickStart="handleJoystickStart"
            @joystickEnd="handleJoystickEnd"
            @toggleLight="set_light"
          />
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-auto slide-out-columnX px-0" :class="{ 'slide-out-columnX': isOptionsVisible, hiddenX: !isOptionsVisible }">
        <div class="row align-items-center butt-col">

          <div class="col">
            <OptionsControl 
              @toggleLight="set_light"
              @startAction="handleStartAction"
              @stopAction="handleStopAction"
            />
          </div>
          
          <div class="col-auto">
            <div class="row align-items-center">
              <button class="tongue-op" @click="toggleOptions">
                <div class="col-auto">
                  <div class="row-cols-1 align-items-center">
                    <div class="col-auto d-sm-none d-lg-block" :style="{ transform: isOptionsVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                      <Polygon class="optin-min" />
                    </div>
                    <div class="col-auto">
                      <Headlight class="optin-min" />
                    </div>
                    <div class="col-auto">
                      <Mic class="optin-min" />
                    </div>
                    <div class="col-auto">
                      <Sound class="optin-min" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-end">
        <camSettings />
      </div>
    </div>
  </div>
</template>

<script>
import Mic from "@/assets/mic-fill.svg";
import Sound from "@/assets/sound.svg";
import Lights from "@/assets/Lights.svg";
import SideLights from "@/assets/SideLights.svg";
import Polygon from "@/assets/Polygon.svg";
import Headlight from "@/assets/headlights.svg";
import Brush from "@/assets/brush.svg";
import Strobe from "@/assets/strobe.svg";
import EmerStopButton from "./EmerStopButton.vue";
import Map from "@/components/maps/MapTeleop.vue";
import camSettings from "@/components/camSettings.vue";

import { useBkmStore } from "@/stores/bkmStore";
import { useRosStore } from "@/stores/ConfigStore";
import { useTeleopStore } from "@/stores/teleopStore2";

import { Swiper, SwiperSlide } from "swiper/vue";

import { ref, computed } from "vue";

import SliderControl from "@/components/TeleopComponents/SliderControl.vue";
import OptionsControl from "@/components/TeleopComponents/OptionsControl.vue";
import JoystickControl from "@/components/TeleopComponents/JoystickControl.vue";
import InfoCard from "@/components/TeleopComponents/InfoCard.vue";

import { useMicrophone } from "../composables/useMicrophone";

import 'swiper/css';
import "swiper/css/free-mode";

import { FreeMode } from 'swiper/modules';
import ROSLIB from "roslib";

export default {
  name: "TeleopPage",
  components: {
    EmerStopButton,
    Lights,
    Polygon,
    Sound,
    Headlight,
    Mic,
    Map,
    Brush,
    Strobe,
    camSettings,
    Swiper,
    SwiperSlide,
    SideLights,
    SliderControl,
    OptionsControl,
    JoystickControl,
    InfoCard
  },
  data: function () {
    return {
      wheel_radius: 0.127,
      isOptionsVisible: false,
      isMapVisible: false,
      isSliderVisible: false,
      lin_speed: 0,
      ang_speed: 0,
      prevLinSpeed: 0,
      listner1: null,
      stopSignalOn: false,
      stopSignalOff: true,
      speed_send_timer: {},
      brush_send_timer: {},
      wash_send_timer: null,
      twist: {
        linear: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        angular: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
      },
      twist_ce: {
        linear: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
        angular: {
          x: 0.0,
          y: 0.0,
          z: 0.0,
        },
      },
      c1_msg: {},
      camera_0: "https://192.168.2.111:1265/stream.html?src=camera_0",
      camera_1: "https://192.168.2.111:1265/stream.html?src=camera_1",
      camera_2: "https://192.168.2.111:1265/stream.html?src=camera_2",
      camera_3: "https://192.168.2.111:1265/stream.html?src=camera_3",
      cameras_side: "https://192.168.2.111:1265/stream.html?src=camera_2&src=camera_3",
      placeholderSrc: "/src/assets/black-screen.gif",
      loaded: false,
      audioElement: null,
      isPlayingSound: false,
      micCommandTopic: null,
      micConnectionStatus: false,
    };
  },
  watch: {
    brush_rotation(newVal) {
      this.sendBrushRotationCommand(newVal);
    },
  },
  setup() {
    const states = {
      lin_max_speed: ref(0),
      ang_max_speed: ref(0),
      brush_speed: ref(0),
      brush_rotation: ref(0),
      wash_pressure: ref(0),
    }

    const {
      micNotification,
      isMicActive,
      startMic,
      stopMic,
      hideMicNotification,
      cleanupMic,
      setOnMicConnected
    } = useMicrophone();

    const rosStore = useRosStore();
    const bkmStore = useBkmStore();
    const teleopStore = useTeleopStore();

    const getColorStyle = (value, thresholds) => {
      if (value.value <= thresholds.green) return { color: "var(--green)" };
      if (value.value <= thresholds.orange) return { color: "var(--orange)" };
      return { color: "var(--red)" };
    };

    // Используем функцию для определения цвета
    const styles = {
      linSpeedColorStyle: computed(() => getColorStyle(states.lin_max_speed, { green: 1, orange: 3 })),
      angSpeedColorStyle: computed(() => getColorStyle(states.ang_max_speed, { green: 1, orange: 3 })),
      brushSpeedColorStyle: computed(() => {
        const val = states.brush_speed.value;
        if (val >= -75 && val <= 140) return { color: "var(--green)" };
        if ((val > -150 && val < -75) || (val > 75 && val < 280)) return { color: "var(--orange)" };
        return { color: "var(--red)" };
      }),
    };

    const sliders = [
      { id: "lin_max_speed_range", label: "Скорость робота", model: states.lin_max_speed, min: 0, max: 7, step: 1, unit: "м/с", colorStyle: styles.linSpeedColorStyle, showValue: true },
      { id: "ang_max_speed_range", label: "Скорость поворота", model: states.ang_max_speed, min: 0, max: 5, step: 0.25, unit: "рад/с", colorStyle: styles.angSpeedColorStyle, showValue: true },
      { id: "brush_speed_range", label: "Скорость щётки", model: states.brush_speed, min: -200, max: 400, step: 20, unit: "об/м", colorStyle: styles.brushSpeedColorStyle, showValue: true },
      { id: "brush_rotate_range", label: "Поворот щётки", model: states.brush_rotation, min: -2, max: 2, step: 1, unit: "", showLetters: true },
      { id: "wash_range", label: "Давление", model: states.wash_pressure, min: 0, max: 50000, step: 5000 }
    ];
    return {
      modules: [FreeMode],
      sliders,
      ...states,
      rosStore,
      bkmStore,
      teleopStore,
      micNotification,
      isMicActive,
      startMic,
      stopMic,
      hideMicNotification,
      cleanupMic,
      setOnMicConnected
    }
  },
  computed: {
    displayC1Msg() {
      if (!this.c1_msg || Object.keys(this.c1_msg).length === 0) {
        return "0";
      } else {
        return `${this.c1_msg}`;
      }
    },

    getNotificationTitle() {
      const titles = {
        connecting: 'Подключение микрофона',
        connected: 'Микрофон подключен',
        error: 'Ошибка микрофона'
      };
      return titles[this.micNotification.type] || 'Уведомление';
    }
  },
  mounted: function () {
    this.speed_send_timer = setInterval(this.send_speed, 200);
    this.brush_send_timer = setInterval(this.send_brush_speed, 300);
    this.wash_send_timer = setInterval(() => {
      this.sendWashPressureCommand(this.wash_pressure);
    }, 200)
    
    setTimeout(() => {
      this.handleError();
    }, 1500);
    this.listner1 = new ROSLIB.Topic({
      ros: this.rosStore.ros,
      name: "/c1_telem",
      messageType: "mcu_msgs/msg/BldcStatus",
    });
    this.listner1.subscribe(this.set_c1_msg);

    this.teleopStore.subscribeToLightState();

    this.soundCommandTopic = new ROSLIB.Topic({
      ros: this.rosStore.ros,
      name: "/sound_control",
      messageType: "std_msgs/msg/Bool"
    });

    this.micCommandTopic = new ROSLIB.Topic({
      ros: this.rosStore.ros,
      name: "/mic_control",
      messageType: "std_msgs/msg/Bool"
    })

    this.setOnMicConnected((connected) => {
      this.micConnectionStatus = connected;
      console.debug(`Microphone connection status: ${connected}`);
      
      // Отправляем команду в ROS только если микрофон подключен
      if (connected) {
        this.sendMicCommand(true);
      }
    });

  },
  unmounted: function() {
    clearInterval(this.speed_send_timer);
    clearInterval(this.brush_send_timer);
    clearInterval(this.wash_send_timer);

    if (this.listner1) {
      this.listner1.unsubscribe();
      this.listner1 = null;
    }

    this.cleanupMic();
  },
  methods: {
    // Обработчик начала действия
    handleStartAction(optionId) {
      if (optionId === "mic") {
        this.startMic();
      } else if (optionId === "sound") {
        this.startSound();
      }
    },

    // Обработчик окончания действия
    handleStopAction(optionId) {
      if (optionId === "mic") {
        this.stopMic();
      } else if (optionId === "sound") {
        this.stopSound();
      }
    },

    startSound() {
      console.debug("Звук активирован");
      this.sendSoundCommand(true);
    },

    // Выключение звука
    stopSound() {
      console.debug("Звук деактивирован");
      this.sendSoundCommand(false);
    },

    sendMicCommand(isEnabled) {
      if (this.micCommandTopic) {
        const message = new ROSLIB.Message({
          data: isEnabled
        });
        this.micCommandTopic.publish(message);
        console.debug(`ROS: Воспроизведение микрофона ${isEnabled ? 'включено' : 'выключено'}`);
      }
    },

    sendSoundCommand(isEnabled) {
      if (this.soundCommandTopic) {
        const message = new ROSLIB.Message({
          data: isEnabled
        });
        this.soundCommandTopic.publish(message);
        console.debug(`ROS: Звук ${isEnabled ? 'включен' : 'выключен'}`);
      }
    },

    handleJoystickUpdate({ lin_speed, ang_speed }) {
      this.lin_speed = lin_speed;
      this.ang_speed = ang_speed;
    },
    handleJoystickStart() {
      console.debug("Joystick Activated");
    },
    handleJoystickEnd() {
      console.debug("Joystick reduced");
    },
    set_c1_msg(msg) {
      this.c1_msg = Math.abs(
        (2 * this.pi * this.wheel_radius * msg.speed_r_meas) / 60
      ).toFixed(2);
    },
    handleError() {
      if (!this.loaded) {
        this.streamSrc = this.placeholderSrc;
      }
    },
    handleLoad() {
      this.loaded = true;
    },
    disable_brush_speed() {
      document.getElementById("brush_speed_range").value = 0;
      this.brush_speed = 0;
    },
    disable_all_sliders() {
      const sliders = {
        lin_max_speed: "lin_max_speed_range",
        ang_max_speed: "ang_max_speed_range",
        brush_speed: "brush_speed_range",
        brush_rotate: "brush_rotate_range",
        wash_pressure: "wash_range"
      };

      for (const [key, sliderId] of Object.entries(sliders)) {
        this[key] = 0;
        document.getElementById(sliderId).value = 0;
        localStorage.setItem(sliderId, 0);
      }
    },
    toggleSlider() {
      this.isSliderVisible = !this.isSliderVisible;
    },
    toggleMap() {
      this.isMapVisible = !this.isMapVisible;
    },
    toggleOptions() {
      this.isOptionsVisible = !this.isOptionsVisible;
    },
    sendBrushRotationCommand(angle) {
      angle = parseInt(angle);
      const angleMap = {
        "-1": -9,
        "1": 9,
        "-2": -15,
        "2": 15
      };
      angle = angleMap[angle] ?? angle;
      var cmd_srv = new ROSLIB.Service({
        ros: this.rosStore.ros,
        name: "/brush_cmd_srv",
        serviceType: "mcu_msgs/srv/CmdAng",
      });

      var request = new ROSLIB.ServiceRequest({
        cmd: "set_angle",
        angle: angle,
      });

      cmd_srv.callService(request);
      console.debug(request);
    },
    sendWashPressureCommand(pressure) {
      const rpm = parseInt(pressure);

      const additionalVescTopic = new ROSLIB.Topic({
        ros: this.rosStore.ros,
        name: '/cmd_vel_additional',
        messageType: 'std_msgs/msg/Float32'
      });

      const message = new ROSLIB.Message({
        data: rpm
      });

      additionalVescTopic.publish(message);
      console.debug(`Sent additional VESC RPM: ${rpm}`);
    },
    set_light(type, isEnabled, previousState = null) {
      var cmd_srv = new ROSLIB.Service({
        ros: this.rosStore.ros,
        name: "/control_light",
        serviceType: "mcu_msgs/srv/LightControl",
      });

      let commands = {};

      // Логика для обработки разных типов
      switch (type) {
        case "strobe":
          commands = {
              on: ["C_FL_L_BLK", "C_FL_R_BLK"],
              off: ["C_FL_L_OFF", "C_FL_R_OFF"]
          };
          break;

        case "side":
          commands = { 
              on: ["C_SL_R_BLK", "C_SL_L_BLK"], 
              off: ["C_SL_R_OFF", "C_SL_L_OFF"] 
          };
          break;

        case "head":
          commands = { on: "C_HL_ON", off: "C_HL_OFF" };
          break;

        case "stopS":
          commands = { on: "C_SS_ON", off: "C_SS_OFF" };
          break;

        default:
          return;
      }

      const requestCommands = (isEnabled && type !== "rotate") ? commands.off : commands.on;
      const parameter = (type === "rotate" && isEnabled !== "stop") ? "500" : (isEnabled ? "0" : "100");

      // Если стробоскоп, отправляем две команды
      if (Array.isArray(requestCommands)) {
        requestCommands.forEach((command) => {
          const request = new ROSLIB.ServiceRequest({ command, parameter });
          cmd_srv.callService(request);
          console.debug(request);
        });
      } else {
        const request = new ROSLIB.ServiceRequest({ command: requestCommands, parameter });
        cmd_srv.callService(request);
        console.debug(request);
      }
    },
    send_speed() {
      const wheelBase = 0.5;
      const wheelRadius = 0.175;
      const maxRpm = 50;

      const { leftSpeed, rightSpeed } = this.calculateWheelSpeeds(wheelBase, wheelRadius, maxRpm);
      const command = `C_SPD_${leftSpeed}_${rightSpeed}`;

      this.publishSpeed(command);
    },
    calculateWheelSpeeds(wheelBase, wheelRadius, maxRpm) {
      const baseSpeed = (this.lin_speed * 60) / (Math.PI * wheelRadius);
      const angSpeedAdj = (this.ang_speed * wheelBase * 30) / (Math.PI * wheelRadius);

      return {
        leftSpeed: Math.max(-maxRpm, Math.min(maxRpm, Math.round(baseSpeed + angSpeedAdj))),
        rightSpeed: Math.max(-maxRpm, Math.min(maxRpm, Math.round(baseSpeed - angSpeedAdj))),
      };
    },
    publishSpeed(command) {
      const ros = this.rosStore.ros;

      if (this.bkmStore.selectedBkm === "БКМ-1") {
        const cmdVel = new ROSLIB.Topic({
          ros,
          name: "/cmd_vel",
          messageType: "geometry_msgs/Twist",
        });

        this.twist.linear.x = this.lin_speed;
        this.twist.angular.z = this.ang_speed;
        cmdVel.publish(this.twist);
      } else if (this.bkmStore.selectedBkm === "БКМ-2") {
        const speedCmd = new ROSLIB.Topic({
          ros,
          name: "/cmd_vel",
          messageType: "geometry_msgs/Twist",
        });

        this.twist.linear.x = this.lin_speed;
        this.twist.angular.z = this.ang_speed;

        speedCmd.publish(this.twist);
      }
    },
    send_brush_speed() {
      this.ce_vel = new ROSLIB.Topic({
        ros: this.rosStore.ros,
        name: "/ce_vel",
        messageType: "geometry_msgs/Twist",
      });
      this.twist_ce.linear.x = Math.round(this.brush_speed);
      this.twist_ce.angular.z = Math.round(this.brush_speed);
      this.ce_vel.publish(this.twist_ce);
    },
  },
};
</script>

<style scoped>
.main {
  overflow: hidden;
  position: relative;
  padding: 10px;
  margin-inline: -0.75rem;
  height: 100dvh;
}

.mic-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  width: 90%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mic-notification-enter-active {
  animation: slideInDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mic-notification-leave-active {
  animation: slideOutUp 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.mic-notification.connecting {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.95), rgba(255, 152, 0, 0.95));
  color: #333;
}

.mic-notification.connected {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(56, 142, 60, 0.95));
  color: white;
}

.mic-notification.error {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.95), rgba(211, 47, 47, 0.95));
  color: white;
}

.notification-content {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.success-icon {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
}

.error-icon {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
}

.notification-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notification-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
}

.notification-message {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.3;
  opacity: 0.9;
}

.notification-actions {
  display: flex;
  align-items: center;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.progress-bar {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9));
  animation: progressIndeterminate 2s linear infinite;
}

@keyframes slideInDown {
  from {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutUp {
  from {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes progressIndeterminate {
  0% {
    transform: translateX(-100%);
    width: 30%;
  }
  50% {
    transform: translateX(0%);
    width: 60%;
  }
  100% {
    transform: translateX(100%);
    width: 30%;
  }
}

.overlay-video {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.overlay-side {
  position: relative;
  box-sizing: border-box;
  z-index: 2;
  scale: 0.7;
}
.side-video-left {
  position: absolute;
  top: 0;
  left: -110px;
  width: 100vh;
  height: 100%;
  pointer-events: none;
  border-radius: 18px;
  border: 2px solid var(--grey2);
}
.video {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -2;
  pointer-events: none;
}
.map-col {
  max-width: 20rem;
  height: 12rem;
}
.slide-col {
  max-width: 20rem;
}
.map {
  border: 2px solid var(--grey2);
  border-radius: 1.125rem;
}
.slide-out-columnX {
  transition: transform 0.5s;
  transform: translateX(0);
}
.hiddenX {
  transform: translateX(-482px);
}
.slide-out-columnX.mapHide {
  transform: translateX(-315px);
}
.slide-out-columnX.slideHide {
  transform: translateX(-315px);
}
.tongue-op {
  background-color: transparent;
  border: none;
  border-left: 2px solid var(--grey2);
  padding-block: 5px;
  color: var(--text-color);
}
.tongue {
  background-color: var(--bg-tertiary);
  border: 2px solid var(--grey2);
  border-top-right-radius: 1.125rem;
  border-bottom-right-radius: 1.125rem;
  padding-block: 5px;
  color: var(--text-color);
}
.bi {
  font-size: 1.5rem;
}
.start1 {
  text-align: center;
  width: 5.95rem;
  @media (max-width: 896px) {
    width: 5rem;
  }
}
.end1 {
  text-align: center;
  width: 5.95rem;
  @media (max-width: 896px) {
    width: 5rem;
  }
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
}
.butt-col {
  background-color: var(--bg-tertiary);
  border: 2px solid var(--grey2);
  margin-inline: 12px;
  border-radius: 1.125rem;
}
.slide {
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem;
  border: 2px solid var(--grey2);
}
.optin-min {
  transform: scale(0.8);
}

@media (max-width: 896px) {
  .slide-out-columnX.mapHide {
    transform: translateX(-229px);
  }
  .slide-out-columnX.slideHide {
    transform: translateX(-229px);
  }
  .butt-col {
    background-color: var(--bg-tertiary);
    border: solid var(--grey2) 0.125rem;
    align-items: center;
    display: flex;
    border-top-left-radius: 1.125rem;
    border-bottom-left-radius: 1.125rem;
    padding-block: 0.5rem;
  }
  .hiddenX {
    transform: translateX(-256px);
  }
  .tongue {
    background-color: var(--bg-tertiary);
    border: none;
    border-left: 2px solid var(--grey2);
    padding: 1px;
    color: var(--text-color);
  }
  .bi {
    font-size: 1rem;
  }
  .current {
    font-size: 1.5cqmax;
  }
}
.back-button {
  background-color: var(--bg-tertiary);
  padding: 8px;
  border-radius: 10px;
  border: 2px solid var(--grey2);
}
</style>
