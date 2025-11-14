import { defineStore } from "pinia";
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from "roslib";

export const useTeleopStore = defineStore("teleop", {
  state: () => ({
    isSmLightsEnabled: false,
    isStrobeEnabled: false,
    isSideEnabled: false,
    isMicEnabled: false,
    isSoundEnabled: false,
  }),

  actions: {
    /** Подписка на ROS-топик light_state */
    subscribeToLightState() {
      const rosStore = useRosStore();

      const lightStateTopic = new ROSLIB.Topic({
        ros: rosStore.ros,
        name: "/light_state",
        messageType: "mcu_msgs/msg/LightState",
      });

      lightStateTopic.subscribe((msg) => {
        this.updateLightState(msg.devices, msg.statuses, msg.values);
      });
    },

    /** Обновление состояния из ROS */
    updateLightState(devices, statuses, values) {
      const lightMap = {};
      devices.forEach((device, index) => {
        lightMap[device] = {
          status: statuses[index], // ON / OFF
          value: values[index], // 255 / 210 / ...
        };
      });

      this.isSmLightsEnabled = lightMap["HL"]?.status === "ON";
      this.isStrobeEnabled = lightMap["FL_L"]?.status === "BLK" || lightMap["FL_R"]?.status === "BLK";
      this.isSideEnabled = lightMap["SL_L"]?.status === "BLK" || lightMap["SL_R"]?.status === "BLK";
    },

    /** Тоггл опции в Store */
    toggleOption(type) {
        switch (type) {
            case "head":
                this.isSmLightsEnabled = !this.isSmLightsEnabled;
                break;
            case "strobe":
                this.isStrobeEnabled = !this.isStrobeEnabled;
                break;
            case "side":
                this.isSideEnabled = !this.isSideEnabled;
                break;
            case "mic":
                this.isMicEnabled = !this.isMicEnabled;
                break;
            case "sound":
                this.isSoundEnabled = !this.isSoundEnabled;
                break;
            default:
                break;
        }
    },

    /** Установка состояния микрофона */
    setMicEnabled(state) {
      this.isMicEnabled = state;
    },

    /** Установка состояния звука */
    setSoundEnabled(state) {
      this.isSoundEnabled = state;
    }
  }
});
