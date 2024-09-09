<template>
  <div class="main">
    <img class="slide-out video" :src="streamSrc" @load="handleLoad" />
    <div class="row">
      <div class="col p-0 ms-4 mt-1">
        <div
          class="row slide-out-columnX d-sm-none d-lg-flex"
          :class="{ 'slide-out-columnX': isMapVisible, mapHide: !isMapVisible }"
        >
          <div class="col pe-0 map-col">
            <Map class="map" />
          </div>
          <div class="col-auto ps-0 d-flex align-items-center">
            <button class="tongue p-lg-2 p-sm-1" @click="toggleMap">
              <div
                :style="{
                  transform: isMapVisible ? 'rotate(90deg)' : 'rotate(-90deg)',
                }"
              >
                <Polygon class="optin-min" />
              </div>
              <i class="bi bi-geo-alt"></i>
            </button>
          </div>
        </div>
        <div
          class="row my-1 my-lg-4 slide-out-columnX"
          :class="{
            'slide-out-columnX': isSliderVisible,
            slideHide: !isSliderVisible,
          }"
        >
          <div class="col pe-0 slide-col">
            <div class="slide p-3 py-1">
              <div class="lin_speed">
                <label for="lin_max_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость робота</span>
                    <span
                      class="col-auto d-flex justify-content-center caption_low pe-0"
                      v-bind:style="linSpeedColorStyle"
                      >{{ lin_max_speed }} м/c</span
                    >
                  </div>
                </label>
                <input
                  v-on:input="set_linear_speed"
                  type="range"
                  class="form-range"
                  min="0"
                  max="5"
                  value="0"
                  step="1"
                  id="lin_max_speed_range"
                />
              </div>
              <div class="robot_rotate">
                <label for="ang_max_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low pe-1"
                      >Скорость поворота</span
                    >
                    <span
                      class="col-auto d-flex justify-content-center caption_low p-0"
                      v-bind:style="angSpeedColorStyle"
                      >{{ ang_max_speed }} рад/c</span
                    >
                  </div>
                </label>
                <input
                  v-on:input="set_angular_speed"
                  type="range"
                  class="form-range"
                  min="0"
                  max="5"
                  value="0"
                  step=".25"
                  id="ang_max_speed_range"
                />
              </div>
              <div class="brush_speed">
                <label for="brush_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость щётки</span>
                    <span
                      class="col-auto d-flex justify-content-center caption_low"
                      v-bind:style="brushSpeedColorStyle"
                      >{{ brush_speed }} об/м
                    </span>
                  </div>
                </label>
                <input
                  v-on:input="set_brush_speed"
                  type="range"
                  class="form-range"
                  min="-200"
                  max="400"
                  v-model="brush_speed"
                  step="20"
                  id="brush_speed_range"
                />
              </div>
              <div class="brush_rotate">
                <label for="brush_rotate_range" class="">
                  <span class="caption_low">Поворот щётки</span>
                </label>
                <div class="range-container">
                  <div class="letter left">L</div>
                  <input
                    v-on:input="setBrushRotation"
                    type="range"
                    class="form-range"
                    min="-2"
                    max="2"
                    value="0"
                    step="1"
                    id="brush_rotate_range"
                  />
                  <div class="letter right">R</div>
                </div>
              </div>
              <div class="wash_pressure">
                <label for="" class="form-label">
                  <div class="row">
                    <span class="col-auto d-flex caption_low">Давление</span>
                  </div>
                </label>
                <input 
                  v-on:input="setWashPressure"
                  type="range" 
                  class="form-range"
                  min="0"
                  max="10"
                  value="0"
                  step="1"
                  id="wash_range"
                />
              </div>
            </div>
          </div>
          <div class="col-auto ps-0 d-flex flex-column justify-content-center">
            <button
              class="tongue"
              style="background-color: var(--red)"
              @click="disable_all_sliders()"
            >
              <i class="bi bi-sign-stop"></i>
            </button>
            <button
              class="tongue p-2 p-sm-1 my-3 my-sm-2"
              @click="toggleSlider"
            >
              <div
                :style="{
                  transform: isSliderVisible
                    ? 'rotate(90deg)'
                    : 'rotate(-90deg)',
                }"
              >
                <Polygon class="optin-min" />
              </div>
              <i class="bi bi-sliders"></i>
            </button>
            <button
              class="tongue"
              style="background-color: var(--red)"
              @click="disable_brush_speed()"
            >
              <Brush class="optin-min" />
            </button>
          </div>
        </div>
      </div>
      <div class="col"></div>
      <div class="col mt-1 pe-0">
        <div class="row justify-content-end me-1">
          <div class="col-auto">
            <table class="current">
              <tr>
                <td class="start1 px-lg-2 px-0 rounded-4">
                  <span class="speedometr">
                    {{ displayC1Msg }}
                  </span>
                  <span>м/с</span>
                </td>
                <td class="end1 px-lg-2 px-0 rounded-4">
                  <span class="speedometr">
                    {{ brush_speed }}
                  </span>
                  <span>об/м</span>
                </td>
              </tr>
              <tr>
                <td class="text-center rounded-4 px-lg-2 px-0">
                  <span><i class="bi bi-robot"></i></span>
                </td>
                <td class="text-center rounded-4 px-lg-2 px-0">
                  <span><Brush /></span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-auto py-lg-4 py-2 px-2">
            <EmerStopButton />
          </div>
        </div>
        <div class="row mt-0 mt-lg-4 justify-content-center">
          <div id="zone_joystick" class="zone static"></div>
        </div>
      </div>
    </div>
    <div class="row align-items-end">
      <div
        class="col-auto ms-4 mb-2 slide-out-columnX"
        :class="{
          'slide-out-columnX': isOptionsVisible,
          hiddenX: !isOptionsVisible,
        }"
      >
        <div class="row">
          <div class="col butt-col">
            <div class="row align-items-center">
              <div class="col">
                <button
                  @click="toggleSmLights"
                  class="buttonSet"
                  :class="{ active: isSmLightsEnabled }"
                >
                  <Headlight class="optin" />
                </button>
              </div>
              <div class="col">
                <button class="buttonSet mic">
                  <Mic class="optin" />
                </button>
              </div>
              <div class="col">
                <button class="buttonSet sound">
                  <Sound class="optin" />
                </button>
              </div>
              <div class="col">
                <button
                  @click="toggleStrobeLights"
                  class="buttonSet"
                  :class="{ active: isStrobeEnabled }"
                >
                  <Strobe class="optin" />
                </button>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="row align-items-center">
              <button class="tongue" @click="toggleOptions">
                <div class="col">
                  <div class="row-cols-1 align-items-center">
                    <div
                      class="col-auto d-sm-none d-lg-block"
                      :style="{
                        transform: isOptionsVisible
                          ? 'rotate(90deg)'
                          : 'rotate(-90deg)',
                      }"
                    >
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
      <div
        class="col slide-out-columnY"
        :class="{
          'slide-out-columnY': isCameraVisible,
          hidden: !isCameraVisible,
        }"
      >
        <div class="row">
          <div class="col">
            <button
              class="px-3 button"
              @click="toggleCamera"
              style="position: absolute; right: -46px; top: -168px"
            >
              <div class="row align-items-center">
                <div
                  class="col-auto px-lg-1 px-sm-0"
                  :style="{
                    transform: isCameraVisible ? 'none' : 'scale(-1, -1)',
                  }"
                >
                  <Polygon class="optin-min" />
                </div>
                <div class="col px-1">
                  <span class="caption">Вид сзади</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="row" style="position: absolute; bottom: -23px">
          <div class="col-auto d-flex justify-content-start">
            <img id="depth" class="slide-out img" />
          </div>
        </div>
      </div>
      <div class="col">
        <camSettings />
      </div>
    </div>
  </div>
</template>

<script>
import Mic from "../assets/mic-fill.svg";
import Sound from "../assets/sound.svg";
import Lights from "../assets/Lights.svg";
import Polygon from "../assets/Polygon.svg";
import Headlight from "../assets/headlights.svg";
import Brush from "../assets/brush.svg";
import Strobe from "../assets/strobe.svg";
import EmerStopButton from "./EmerStopButton.vue";
import nipplejs from "nipplejs";
import ROSLIB from "roslib/src/RosLib";
import Map from "./maps/Map1.vue";
import camSettings from "./camSettings.vue";

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
  },
  data: function () {
    return {
      pi: 3.1415,
      wheel_radius: 0.127,
      isCameraVisible: false,
      isSmLightsEnabled: true,
      isOptionsVisible: false,
      isMapVisible: false,
      isSliderVisible: false,
      isStrobeEnabled: true,
      brush_speed: 0,
      brush_angle: 0,
      lin_max_speed: 0,
      ang_max_speed: 0,
      lin_speed: 0,
      ang_speed: 0,
      speed_send_timer: {},
      brush_send_timer: {},
      ros: {},
      janus: null,
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
      cmdVel: 0,
      c1_msg: {},
      streamSrc: "http://192.168.0.106:1984/api/stream.mjpeg?src=linux_webcam",
      placeholderSrc: "/src/assets/black-screen.gif",
      loaded: false,
    };
  },

  computed: {
    linSpeedColorStyle() {
      if (this.lin_max_speed <= 1) {
        return { color: "var(--green)" };
      } else if (this.lin_max_speed <= 3) {
        return { color: "var(--orange)" };
      } else {
        return { color: "var(--red)" };
      }
    },
    brushSpeedColorStyle() {
      if (this.brush_speed >= -75 && this.brush_speed <= 140) {
        return { color: "var(--green)" };
      } else if (
        (this.brush_speed > -150 && this.brush_speed < -75) ||
        (this.brush_speed > 75 && this.brush_speed < 280)
      ) {
        return { color: "var(--orange)" };
      } else {
        return { color: "var(--red)" };
      }
    },
    angSpeedColorStyle() {
      if (this.ang_max_speed <= 1) {
        return { color: "var(--green)" };
      } else if (this.ang_max_speed <= 3) {
        return { color: "var(--orange)" };
      } else {
        return { color: "var(--red)" };
      }
    },
    displayC1Msg() {
      if (!this.c1_msg || Object.keys(this.c1_msg).length === 0) {
        return "0";
      } else {
        return `${this.c1_msg}`;
      }
    },
  },
  mounted: function () {
    var options = {
      zone: document.getElementById("zone_joystick"),
      mode: "static",
      color: "white",
      position: {
        left: "50%",
        bottom: "50%",
      },
      size: 200,
    };
    this.joystick = nipplejs.create(options);
    this.joystick
      .on("start", this.joystick_start)
      .on("move", this.joystick_move)
      .on("end", this.joystick_end);
    this.speed_send_timer = setInterval(this.send_speed, 200);
    this.brush_send_timer = setInterval(this.send_brush_speed, 300);
    this.ros = new ROSLIB.Ros({ url: "ws://192.168.0.15:9090" });

    this.ros.on("connection", function () {
      console.log("Connected to websocket server.");
    });

    var imageSub = new ROSLIB.Topic({
      ros: this.ros,
      name: "/out/compressed",
      messageType: "sensor_msgs/msg/CompressedImage",
    });

    imageSub.subscribe(function (message) {
      document.getElementById("depth").src =
        "data:image/" + message.format + ";base64," + message.data;
    });
    setTimeout(() => {
      this.handleError();
    }, 700);
    var listner1 = new ROSLIB.Topic({
      ros: this.ros,
      name: "/c1_telem",
      messageType: "mcu_msgs/msg/BldcStatus",
    });
    listner1.subscribe(this.set_c1_msg);
  },
  methods: {
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
    toggleSmLights() {
      this.set_sm_lights();
      this.isSmLightsEnabled = !this.isSmLightsEnabled;
    },
    toggleStrobeLights() {
      this.set_strobe_lights();
      this.isStrobeEnabled = !this.isStrobeEnabled;
    },
    disable_brush_speed() {
      document.getElementById("brush_speed_range").value = 0;
      this.brush_speed = 0;
    },
    disable_all_sliders() {
      document.getElementById("lin_max_speed_range").value = 0;
      this.lin_max_speed = 0;

      document.getElementById("ang_max_speed_range").value = 0;
      this.ang_max_speed = 0;

      document.getElementById("brush_speed_range").value = 0;
      this.brush_speed = 0;

      document.getElementById("brush_rotate_range").value = 0;
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
    toggleCamera() {
      this.isCameraVisible = !this.isCameraVisible;
    },
    set_brush_speed() {
      this.brush_speed = document.getElementById("brush_speed_range").value;
      this.send_brush_speed();
    },
    set_brush_angle() {
      this.brush_angle = document.getElementById("brush_angle_range").value;
    },
    set_linear_speed() {
      this.lin_max_speed = document.getElementById("lin_max_speed_range").value;
    },
    set_angular_speed() {
      this.ang_max_speed = document.getElementById("ang_max_speed_range").value;
    },
    setBrushRotation(event) {
      const value = parseInt(event.target.value);
      let angle = 0;

      if (value === -1) {
        angle = -9;
      } else if (value === 1) {
        angle = 9;
      } else if (value === -2) {
        angle = -15;
      } else if (value === 2) {
        angle = 15;
      }

      this.sendBrushRotationCommand(angle);
    },
    sendBrushRotationCommand(angle) {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: "/brush_cmd_srv",
        serviceType: "mcu_msgs/srv/CmdAng",
      });

      var request = new ROSLIB.ServiceRequest({
        cmd: "set_angle",
        angle: angle,
      });

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
      console.log(request);
    },
    setWashPressure(event) {
      const value = parseInt(event.target.value);
      const pressure = Math.round((value / 10) * 255);
      console.log(pressure);

      this.sendWashPressureCommand(pressure);
    },
    sendWashPressureCommand(pressure) {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: "/wash_cmd_srv",
        serviceType: "mcu_msgs/srv/CmdPres",
      });

      var request = new ROSLIB.ServiceRequest({
        cmd: "set_pressure",
        pressure: pressure,
      });

      cmd_srv.callService(request, function(result) {

      });
      console.log(request); 
    },
    set_sm_lights() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: "/bkm_cmd_srv",
        serviceType: "mcu_msgs/srv/TextCmd",
      });

      if (this.isSmLightsEnabled) {
        var request = new ROSLIB.ServiceRequest({
          cmd: "SM_LIGHTS_DIS",
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          cmd: "SM_LIGHTS_EN",
        });
      }

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
      console.log(request);
    },
    set_strobe_lights() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: "/bkm_cmd_srv",
        serviceType: "mcu_msgs/srv/TextCmd",
      });
      if (this.isStrobeEnabled) {
        var request = new ROSLIB.ServiceRequest({
          cmd: "STROBE_DIS",
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          cmd: "STROBE_EN",
        });
      }

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
      console.log(request);
    },
    joystick_move(evt, data) {
      this.lin_speed =
        Math.round(
          Math.min(
            Math.max(
              data.vector.y * (this.lin_max_speed * 0.75) * 0.5 * data.force,
              -this.lin_max_speed
            ),
            this.lin_max_speed
          ) * 100
        ) / 100;

      // Если lin_speed отрицательна, меняем знак у ang_speed
      if (this.lin_speed < -0.15) {
        this.ang_speed =
          Math.round(
            Math.min(
              Math.max(
                data.vector.x * (this.ang_max_speed * 0.75) * 0.5 * data.force,
                -this.ang_max_speed
              ),
              this.ang_max_speed
            ) * 100
          ) / 100;
      } else {
        this.ang_speed =
          -Math.round(
            Math.min(
              Math.max(
                data.vector.x * (this.ang_max_speed * 0.75) * 0.5 * data.force,
                -this.ang_max_speed
              ),
              this.ang_max_speed
            ) * 100
          ) / 100;
      }
    },
    joystick_start(evt, data) {},
    joystick_end(evt, data) {
      this.lin_speed = 0;
      this.ang_speed = 0;
    },
    send_speed() {
      this.cmdVel = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });
      this.twist.linear.x = this.lin_speed;
      this.twist.angular.z = this.ang_speed;
      this.cmdVel.publish(this.twist);
    },
    stop_moving() {
      document.getElementById("moveing_enable").checked = false;
      document.getElementById("lin_max_speed_range1").value = 0;
      document.getElementById("ang_max_speed_range").value = 0;
      this.lin_max_speed = 0;
      this.ang_max_speed = 0;
      this.lin_speed = 0;
      this.ang_speed = 0;
    },
    send_brush_speed() {
      this.ce_vel = new ROSLIB.Topic({
        ros: this.ros,
        name: "/ce_vel",
        messageType: "geometry_msgs/Twist",
      });
      this.twist_ce.linear.x = Math.round(this.brush_speed);
      this.twist_ce.angular.z = Math.round(this.brush_speed);
      this.ce_vel.publish(this.twist_ce);
      // alert("ss");
    },
  },
  send_cmd() {
    var cmd_srv = new ROSLIB.Service({
      ros: this.ros,
      name: "/bkm_cmd_srv",
      serviceType: "mcu_msgs/srv/TextCmd",
    });
    var request = new ROSLIB.ServiceRequest({
      cmd: document.getElementById("cmd1").value,
    });
    cmd_srv.callService(request, function (result) {
      alert("Команда отправлена " + cmd_srv.name + ": " + result.success);
    });
  },
};
</script>

<style scoped>
.main {
  overflow: hidden;
  margin-inline: -0.75rem;
  position: relative;
  height: 100vh;
}

.video {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.zone {
  position: relative;
  width: 200px;
  height: 200px;
}
.map-col {
  max-width: 20rem;
  height: 12rem;
}
.slide-col {
  max-width: 20rem;
}
.map {
  border: solid var(--grey2) 0.25rem;
  border-radius: 1.125rem;
}
.caption {
  font-size: 1.35rem;
  color: var(--text-color);
}
.button {
  box-shadow: 4px -4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem 1.125rem 0 0;
  border: solid 0.125rem var(--grey2);
  z-index: 1;
}
.slide-out-columnY {
  transition: transform 0.5s ease;
  transform: translateY(0);
}
.slide-out-columnX {
  transition: transform 0.5s ease;
  transform: translateX(0);
}
.hiddenX {
  transform: translateX(-422px);
}
.slide-out-columnX.mapHide {
  transform: translateX(-320px);
}
.slide-out-columnX.slideHide {
  transform: translateX(-320px);
}
.slide-out-columnY.hidden {
  transform: translateY(154px);
}
.img {
  border-top-left-radius: 1.125rem;
  border: solid var(--grey2) 0.125rem;
  box-shadow: 4px -4px 4px 0 rgba(0, 0, 0, 0.25);
  width: 370px;
  height: 154px;
}
.tongue {
  background-color: var(--bg-tertiary);
  border: solid 0.125rem var(--grey2);
  border-top-right-radius: 1.125rem;
  border-bottom-right-radius: 1.125rem;
  padding-block: 5px;
  color: var(--text-color);
}
.bi {
  font-size: 1.5rem;
}
.bi-robot {
  font-size: 28px;
  @media (max-width: 896px) {
    font-size: 1rem;
  }
}
.buttonSet {
  border-radius: 50%;
  padding: 1.5rem;
  border: solid var(--grey2) 0.125rem;
  background-color: transparent;
  cursor: pointer;
}
.current {
  border-collapse: separate;
}
td {
  background-color: var(--bg-tertiary);
  padding: 1px;
  border: solid 2px var(--grey2);
}
td.start1 {
  text-align: center;
  width: 8rem;
  @media (max-width: 896px) {
    width: 5rem;
  }
}
td.end1 {
  text-align: center;
  width: 8rem;
  @media (max-width: 896px) {
    width: 5rem;
  }
}
.speedometr {
  font-family: "Shine More";
  font-size: 2.2rem;
  margin: 0;
  padding: 0;
  @media (max-width: 896px) {
    font-size: 1rem;
  }
}
.buttonSet.mic:active,
.buttonSet.sound:active {
  border-color: var(--green);
}
.butt-col {
  background-color: var(--bg-tertiary);
  border: solid var(--grey2) 0.125rem;
  padding-block: 14px;
  border-top-left-radius: 1.125rem;
  border-bottom-left-radius: 1.125rem;
}
.slide {
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem;
  border: solid var(--grey2);
}
.caption_low {
  font-size: 1.3rem;
  margin-bottom: -1.3rem;
}
.lin_speed {
  margin-bottom: -1rem;
}
.robot_rotate {
  margin-bottom: -1rem;
}
.brush_speed {
  margin-bottom: -1rem;
}
.brush_rotate {
  margin-bottom: -1rem;
}
.range-container {
  position: relative;
}
.letter {
  position: absolute;
  z-index: 1;
  top: 0.4rem;
  width: 0.75rem;
  text-align: center;
  font-weight: 700;
  font-family: "SF Pro Bold";
  color: var(--text-color);
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}
.left {
  left: 0.5rem;
}
.right {
  right: 0.5rem;
}
.active {
  border-color: var(--green);
}
.optin {
  transform: scale(2);
}
.optin-min {
  transform: scale(0.9);
}

@media (max-width: 896px) {
  .slide-out-columnX.mapHide {
    transform: translateX(-229px);
  }
  .slide-out-columnX.slideHide {
    transform: translateX(-229px);
  }
  .caption_low {
    font-size: 1.5cqmax;
  }
  .caption {
    font-size: 1rem;
  }
  .optin {
    transform: scale(1);
  }
  .buttonSet {
    padding: 3px;
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
    border: solid 0.125rem var(--grey2);
    border-top-right-radius: 1.125rem;
    border-bottom-right-radius: 1.125rem;
    padding: 1px;
    color: var(--text-color);
  }
  .bi {
    font-size: 1rem;
  }
  .current {
    font-size: 1.5cqmax;
  }
  .letter {
    top: 0.25rem;
    width: 0.75rem;
    font-weight: 700;
    font-size: 0.8rem;
  }
  .img {
    width: 350px;
    height: 1px;
  }
  .zone {
    width: 135px;
    height: 135px;
  }
}
.back-button {
  background-color: var(--bg-tertiary);
  padding: 8px;
  border-radius: 10px;
  border: 2px solid var(--grey2);
}
</style>
