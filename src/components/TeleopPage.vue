<template>
  <div class="main">
    <img class="slide-out video" :src="streamSrc" @error="handleError" @load="handleLoad">
    <div class="row">
      <div class="col p-0 ms-4 mt-1">
        <div class="row slide-out-columnX" :class="{ 'slide-out-columnX':  isMapVisible, 'mapHide': !isMapVisible }">
          <div class="col pe-0 map-col">
            <Map class="map" />
          </div>
          <div class="col-auto ps-0 d-flex align-items-center">
            <button class="tongue p-lg-2 p-sm-1" @click="toggleMap">
              <div :style="{ 'transform': isMapVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                <Polygon class="optin-min"/>
              </div>
              <i class="bi bi-geo-alt"></i>
            </button>
          </div>
        </div>
        <div class="row mt-1 slide-out-columnX" :class="{ 'slide-out-columnX': isSliderVisible, 'slideHide' : !isSliderVisible }">
          <div class="col pe-0 slide-col">
            <div class="slide p-3 py-1">
              <div class="lin_speed">
                <label for="lin_max_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость робота</span> 
                    <span class="col-auto d-flex justify-content-center caption_low pe-0" v-bind:style="linSpeedColorStyle">{{ lin_max_speed }} м/c</span>
                  </div>
                </label>
                <input v-on:input="set_linear_speed" type="range" class="form-range" min="0" max="15" value="0" step="1" id="lin_max_speed_range"/>
              </div>
              <div class="robot_rotate">
                <label for="ang_max_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость поворота</span> 
                    <span class="col-auto d-flex justify-content-center caption_low p-0" v-bind:style="angSpeedColorStyle">{{ ang_max_speed }} рад/c</span>
                  </div>
                </label>
                <input v-on:input="set_angular_speed" type="range" class="form-range" min="0" max="5" value="0" step=".5" id="ang_max_speed_range"/>
              </div>
              <div class="brush_speed">
                <label for="brush_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость щётки</span> 
                    <span class="col-auto d-flex justify-content-center caption_low" v-bind:style="brushSpeedColorStyle">{{ brush_speed }} об/м</span>
                  </div>
                </label>
                <input v-on:input="set_brush_speed" type="range" class="form-range" min="-200" max="400" v-model="brush_speed" step="20" id="brush_speed_range"/>
              </div>
              <div class="brush_rotate">
                <label for="brush_rotate_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Поворот щетки</span> 
                  </div>
                </label>
                <div class="range-container">
                  <div class="letter left">L</div>
                  <input v-on:input="setBrushRotation" type="range" class="form-range" min="-1" max="1" value="0" step="1" id="brush_rotate_range"/>
                  <div class="letter right">R</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto ps-0 d-flex flex-column justify-content-center">
            <button class="tongue" style="background-color: var(--red);" @click="disable_all_sliders()">
              <i class="bi bi-sign-stop"></i>
            </button>
            <button class="tongue p-2 p-sm-1 my-3 my-sm-2" @click="toggleSlider">
              <div :style="{ 'transform': isSliderVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                <Polygon class="optin-min"/>
              </div>
              <i class="bi bi-sliders"></i>
            </button>
            <button class="tongue" style="background-color: var(--red);" @click="disable_brush_speed()">
              <Brush class="optin-min"/>
            </button>
          </div>
        </div>
      </div>
      <div class="col"></div>
      <div class="col mt-1">
        <div class="row justify-content-end me-1">
          <div class="col-auto">
            <table class="current">
              <tr>
                <td class="start">
                  Скорость робота
                </td>
                <td class="start1">
                  <span>{{ c1_msg }} м/c</span>
                </td>
              </tr>
              <tr>
                <td class="end">
                  Скорость щётки
                </td>
                <td class="end1">
                  <span>{{ brush_speed }} об/м</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col d-flex justify-content-center p-lg-4 p-2">
            <EmerStopButton />
          </div>
        </div>
        <div class="row mt-0 mt-lg-5 justify-content-center">
          <div id="zone_joystick" class="zone static"></div>
        </div>
      </div>
    </div>
    <div class="row align-items-end">
      <div class="col-auto ms-4 mb-2 slide-out-columnX" :class="{ 'slide-out-columnX': isOptionsVisible, 'hiddenX': !isOptionsVisible }">
        <div class="row">
          <div class="col butt-col">
            <div class="row align-items-center">
              <div class="col">
                <button @click="toggleSmLights" class="buttonSet" :class="{ 'active': isSmLightsEnabled }">
                  <Headlight class="optin"/>
                </button>
              </div>
              <div class="col">
                <button class="buttonSet mic">
                  <Mic class="optin"/>
                </button>
              </div>
              <div class="col">
                <button class="buttonSet sound">
                  <Sound class="optin"/>
                </button>
              </div>
              <div class="col">
                <button @click="toggleStrobeLights" class="buttonSet" :class="{ 'active': isStrobeEnabled }">
                  <Strobe class="optin"/>
                </button>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="row align-items-center">
              <button class="tongue" @click="toggleOptions">
                <div class="col">
                  <div class="row-cols-1 align-items-center">
                    <div class="col-auto" :style="{ 'transform': isOptionsVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                      <Polygon class="optin-min"/>
                    </div>
                    <div class="col-auto">
                      <Headlight class="optin-min"/>
                    </div>
                    <div class="col-auto">
                      <Mic class="optin-min"/>
                    </div>
                    <div class="col-auto">
                      <Sound class="optin-min"/>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-auto slide-out-columnY" :class="{ 'slide-out-columnY': isCameraVisible, 'hidden': !isCameraVisible }">
        <div class="row">
          <div class="col d-flex justify-content-end">
            <button class="px-3 fixed-button button" @click="toggleCamera">
              <div class="row align-items-center">
                <div class="col-auto px-lg-1 px-sm-0" :style="{ transform: isCameraVisible ? 'none' : 'scale(-1, -1)' }">
                  <Polygon class="optin-min"/>
                </div>
                <div class="col px-1">
                  <span class="caption">Вид сзади</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-auto d-flex justify-content-start">
            <img id="depth" class="slide-out img">
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
import Strobe from "../assets/strobe.svg"
import EmerStopButton from "./EmerStopButton.vue";
import BatteryInfo from "./BatteryInfo.vue";
import nipplejs from "nipplejs";
import ROSLIB  from 'roslib/src/RosLib'
import Map from "./maps/Map1.vue";
import camSettings from "./camSettings.vue";

export default {
  name: "TeleopPage",
  components: { 
    BatteryInfo, 
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
          z: 0.0
        },
        angular: {
          x: 0.0,
          y: 0.0,
          z: 0.0
        }
      },
      twist_ce: {
        linear: {
          x: 0.0,
          y: 0.0,
          z: 0.0
        },
        angular: {
          x: 0.0,
          y: 0.0,
          z: 0.0
        }
      },
      cmdVel: 0,
      c1_msg: {},
      streamSrc: 'http://192.168.1.1:8080/stream',
      placeholderSrc: '/src/assets/black-screen.jpg',
      loaded: false,
    };
  },
  
  computed: {
        linSpeedColorStyle() {
            if (this.lin_max_speed <= 5) {
                return { color: 'var(--green)' };
            } else if (this.lin_max_speed <= 10) {
                return { color: 'var(--orange)' };
            } else {
                return { color: 'var(--red)' };
            }
        },
        brushSpeedColorStyle() {
            if(this.brush_speed >= -75 && this.brush_speed <= 140) {
                return { color: 'var(--green)' };
            } else if (this.brush_speed > -150 && this.brush_speed < -75 || (this.brush_speed > 75 && this.brush_speed < 280)) {
                return { color: 'var(--orange)' };
            } else {
                return { color: 'var(--red)' };
            }
        },
        angSpeedColorStyle() {
          if (this.ang_max_speed <= 1) {
            return { color: 'var(--green)' };
          } else if (this.ang_max_speed <= 3) {
            return { color: 'var(--orange)' };
          } else {
            return { color: 'var(--red)' };
          }
        },
  },
  mounted: function () {
    var options = {
      zone: document.getElementById('zone_joystick'),
      mode: 'static',
      color: 'white',
      position: {
        left: '50%',
        bottom: '50%'
      },
      size: 175,
    };
    this.joystick = nipplejs.create(options);
    this.joystick.on('start', this.joystick_start).on('move', this.joystick_move).on('end', this.joystick_end);
    this.speed_send_timer = setInterval(this.send_speed, 200);
    this.brush_send_timer = setInterval(this.send_brush_speed, 300);
    this.ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });

    this.ros.on('connection', function () {
      console.log('Connected to websocket server.');
    });

    var imageSub = new ROSLIB.Topic({
      ros: this.ros,
      name: '/out/compressed',
      messageType: 'sensor_msgs/msg/CompressedImage',
    })

    imageSub.subscribe(function(message) {
      document.getElementById('depth').src = "data:image/" + message.format + ";base64," + message.data;
    }) 
    setTimeout(() => {
      this.handleError();
    }, 500);
    var listner1 = new ROSLIB.Topic({
      ros: this.ros,
      name: '/c1_telem',
      messageType: 'mcu_msgs/msg/BldcStatus'
    });
    listner1.subscribe(this.set_c1_msg);
  },
  methods: {
    set_c1_msg(msg) {
      this.c1_msg = (Math.abs((2*this.pi*this.wheel_radius*msg.speed_r_meas) / 60)).toFixed(2);
    },
    handleError() {
      if(!this.loaded) {
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
      this.brush_angle = document.getElementById("brush_angle_range").value
    },
    set_linear_speed() {
      this.lin_max_speed = document.getElementById("lin_max_speed_range").value
    },
    set_angular_speed() {
      this.ang_max_speed = document.getElementById("ang_max_speed_range").value
    },
    setBrushRotation(event) {
      const value = parseInt(event.target.value);
      let angle = 0;

      if (value === -1) {
        angle = -19;
      } else if (value === 1) {
        angle = 29;
      }

      this.sendBrushRotationCommand(angle);
    },

    sendBrushRotationCommand(angle) {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });

      var request = new ROSLIB.ServiceRequest({
        cmd: "set_angle",
        angle: angle,
      });

      cmd_srv.callService(request, function (result) {
        alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
      console.log(request);
    },
    set_sm_lights() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });

      if (this.isSmLightsEnabled) {
        var request = new ROSLIB.ServiceRequest({
          cmd: "SM_LIGHTS_DIS"
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          cmd: "SM_LIGHTS_EN"
        });
      }

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
      console.log(request)
    },
    set_strobe_lights() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });
      if (this.isStrobeEnabled) {
        var request = new ROSLIB.ServiceRequest({
          cmd: "STROBE_DIS"
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          cmd: "STROBE_EN"
        });
      }

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
      console.log(request);
    },
    joystick_move(evt, data) {

      this.lin_speed = Math.round(Math.min(Math.max(data.vector.y * (this.lin_max_speed * 0.75) * 0.5 * data.force, -this.lin_max_speed), this.lin_max_speed) * 100) / 100;

      // Если lin_speed отрицательна, меняем знак у ang_speed
      if (this.lin_speed < -0.15) {
        this.ang_speed = Math.round(Math.min(Math.max(data.vector.x * (this.ang_max_speed * 0.75) * 0.5 * data.force, -this.ang_max_speed), this.ang_max_speed) * 100) / 100;
      } else {
        this.ang_speed = -Math.round(Math.min(Math.max(data.vector.x * (this.ang_max_speed * 0.75) * 0.5 * data.force, -this.ang_max_speed), this.ang_max_speed) * 100) / 100;
      }
    },
    joystick_start(evt, data) {
      
    },
    joystick_end(evt, data) {
      this.lin_speed = 0;
      this.ang_speed = 0;
    },
    send_speed() {
        this.cmdVel = new ROSLIB.Topic({
          ros: this.ros,
          name: '/cmd_vel',
          messageType: 'geometry_msgs/Twist'
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
          name: '/ce_vel',
          messageType: 'geometry_msgs/Twist'
        });
        this.twist_ce.linear.x = Math.round(this.brush_speed);
        this.twist_ce.angular.z = Math.round(this.brush_speed);
        this.ce_vel.publish(this.twist_ce);
        // alert("ss");
      }

    },
    send_cmd() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });
      var request = new ROSLIB.ServiceRequest({
        cmd: document.getElementById("cmd1").value
      });
      cmd_srv.callService(request, function (result) {
        alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
    },
    
  }


</script>

<style scoped>
.main {
  overflow: hidden;
  margin-inline: -.75rem;
  position: relative;
  height: 100%;
}

.main .video {
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
  border: solid var(--grey2) .25rem;
  border-radius: 1.125rem;
}
.caption {
  font-size: 1.35rem;
  color: var(--text-color);
}
.button {
  box-shadow: 4px -4px 4px 0 rgba(0, 0, 0, .25);
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem 1.125rem 0 0;
  border: solid .125rem var(--grey2);
  z-index: 1;
}
.slide-out-columnY {
  transition: transform .5s ease;
  transform: translateY(0);
}
.slide-out-columnX {
  transition: transform .5s ease;
  transform: translateX(0);
}
.hiddenX {
  transform: translateX(-414px);
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
  border: solid var(--grey2) .125rem;
  box-shadow: 4px -4px 4px 0 rgba(0, 0, 0, .25);
  width: 370px;
  height: 154px;
}
.tongue{
  background-color: var(--bg-tertiary);
  border: solid .125rem var(--grey2);
  border-top-right-radius: 1.125rem;
  border-bottom-right-radius: 1.125rem;
  padding-block: 5px;
  color: var(--text-color);
}
.bi {
  font-size: 1.5rem;
}
.buttonSet {
  border-radius: 50%; 
  padding: 1.5rem;
  border: solid var(--grey2) .125rem; 
  background-color: transparent;
  cursor: pointer;
}
.current {
  border-radius: 1.125rem;
  border-collapse: separate;
  border-spacing: 0;
  font-size: .95rem;
}
tr {
  padding-inline: 2rem;
}
td {
  background-color: var(--bg-tertiary);
  padding: .25rem;
  border: solid 2px var(--grey2);
}
td.start {
  border-top-left-radius: 1rem;
  border-bottom: none;
}
td.start1 {
  border-top-right-radius: 1rem;
  border-bottom: none;
  border-left: none;
  text-align: center;
}
td.end {
  border-bottom-left-radius: 1rem;
}
td.end1 {
  border-bottom-right-radius: 1rem;
  border-left: none;
  text-align: center;
  width: 4.95rem;
}
.buttonSet.mic:active,
.buttonSet.sound:active {
  border-color: var(--green);
}
.butt-col {
  background-color: var(--bg-tertiary);
  border: solid var(--grey2) .125rem;
  padding-block: 17px;
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
    margin-bottom: -1rem;
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
.range-container {
  position: relative;
}
.letter {
  position: absolute;
  z-index: 1;
  top: .35rem;
  width: .75rem;
  text-align: center;
  font-weight: 700;
  font-family: "SF Pro Bold";
  color: var(--text-color);
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}
.left {
  left: .5rem;
}
.right {
  right: .5rem;
}
.active {
  border-color: var(--green);
}
.optin {
  transform: scale(2);
}
.optin-min {
  transform: scale(.9);
}

@media (max-width: 896px) {
  .slide-out-columnX.mapHide {
    transform: translateX(-64cqmax);
  }
  .slide-out-columnX.slideHide {
    transform: translateX(-63.5cqmax);
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
  .optin-min {
    transform: scale(.6);
  }
  .buttonSet {
    padding: .5rem;
  } 
  .map-col {
    height: 8rem;
  }
  .butt-col {
    background-color: var(--bg-tertiary);
    border: solid var(--grey2) .125rem;
    align-items: center;
    border-top-left-radius: 1.125rem;
    border-bottom-left-radius: 1.125rem;
    padding-block: 1.9rem;
  }
  .hiddenX {
    transform: translateX(-82.7cqmax);
  }
  .tongue{
    background-color: var(--bg-tertiary);
    border: solid .125rem var(--grey2);
    border-top-right-radius: 1.125rem;
    border-bottom-right-radius: 1.125rem;
    padding: .5cqmin;
    color: var(--text-color);
  }
  .bi {
    font-size: 1rem;
  }
  .current {
    font-size: 1.5cqmax;
  }
  .letter {
    top: .25rem;
    width: .75rem;
    font-weight: 700;
    font-size: .8rem;
  }
  .img {
    width: 350px;
    height: 1px;
  }
  .slide-out-columnY.hidden {
    transform: translateY(1px);
  }
}
</style>