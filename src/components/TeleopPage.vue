<template>
  <div class="main">
    <div class="row">
      <div class="col p-0 ms-4 mt-1">
        <div class="row slide-out-columnX" :class="{ 'slide-out-columnX':  isMapVisible, 'mapHide': !isMapVisible }">
          <div class="col pe-0 map-col">
            <Map class="map" />
          </div>
          <div class="col-auto ps-0 d-flex align-items-center">
            <button class="tongue p-2" @click="toggleMap">
              <div :style="{ 'transform': isMapVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                <Polygon style="scale: .9;"/>
              </div>
              <i class="bi bi-geo-alt"></i>
            </button>
          </div>
        </div>
        <div class="row mt-1 slide-out-columnX" :class="{ 'slide-out-columnX': isSliderVisible, 'slideHide' : !isSliderVisible }">
          <div class="col pe-0 slide-col">
            <div class="slide p-3 py-1">
              <div class="lin_speed">
                <label for="lin_max_speed_range1" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость робота</span> 
                    <span class="col-auto d-flex justify-content-center caption_low pe-0" v-bind:style="linSpeedColorStyle">{{ lin_max_speed }} м/c</span>
                  </div>
                </label>
                <input v-on:input="set_linear_speed" type="range" class="form-range" min="0" max="15" value="0" step="1" id="lin_max_speed_range1"/>
              </div>
              <div class="robot_rotate">
                <label for="ang_max_speed_range" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость поворота</span> 
                    <span class="col-auto d-flex justify-content-center caption_low p-0" v-bind:style="angSpeedColorStyle">{{ ang_max_speed }} рад/c</span>
                  </div>
                </label>
                <input v-on:input="set_angular_speed" type="range" class="form-range" min="0" max="5" value="0" step="1" id="ang_max_speed_range"/>
              </div>
              <div class="brush_speed" v-on:dblclick="disable_brush_speed">
                <label for="brush_speed_range1" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Скорость щётки</span> 
                    <span class="col-auto d-flex justify-content-center caption_low" v-bind:style="brushSpeedColorStyle">{{ brush_speed }} об/м</span>
                  </div>
                </label>
                <input v-on:input="set_brush_speed" type="range" class="form-range" min="-200" max="400" v-model="brush_speed" step="20" id="brush_speed_range1"/>
              </div>
              <div class="brush_rotate">
                <label for="brush_rotate_range1" class="form-label">
                  <div class="row">
                    <span class="col-auto caption_low">Поворот щетки</span> 
                  </div>
                </label>
                <div class="range-container">
                  <div class="letter left">L</div>
                  <input type="range" class="form-range" min="0" max="2" value="1" step="1" id="brush_rotate_range1"/>
                  <div class="letter right">R</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto ps-0 d-flex align-items-center">
            <button class="tongue p-2" @click="toggleSlider">
              <div :style="{ 'transform': isSliderVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                <Polygon style="scale: .9;"/>
              </div>
              <i class="bi bi-sliders"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col"></div>
      <div class="col mt-4">
        <div class="row align-items-center">
          <div class="col d-flex justify-content-center p-5">
            <EmerStopButton />
          </div>
        </div>
        <div class="row mt-5 justify-content-center">
          <div id="zone_joystick" class="zone static"></div>
        </div>
      </div>
    </div>
    <div class="row align-items-end">
      <div class="col-auto ms-4 mb-2 slide-out-columnX" :class="{ 'slide-out-columnX': isOptionsVisible, 'hiddenX': !isOptionsVisible }">
        <div class="row align-items-center">
          <div class="col butt-col">
            <div class="row align-items-center">
              <div class="col">
                <button @click="toggleStrobe" class="buttonSet" :class="{ 'active': isStrobeEnabled }">
                  <Lights style="transform: scale(2);"/>
                </button>
              </div>
              <div class="col">
                <button class="buttonSet mic">
                  <Mic style="transform: scale(2);"/>
                </button>
              </div>
              <div class="col">
                <button class="buttonSet">
                  <Sound style="transform: scale(2);"/>
                </button>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="row align-items-center">
              <button class="tongue" @click="toggleOptions">
                <div class="col">
                  <div class="row align-items-center">
                    <div class="col-auto" :style="{ 'transform': isOptionsVisible ? 'rotate(90deg)' : 'rotate(-90deg)' }">
                      <Polygon style="transform: scale(.9);"/>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-auto">
                      <Lights style="transform: scale(.9);"/>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-auto">
                      <Mic style="transform: scale(.9);"/>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-auto">
                      <Sound style="transform: scale(.9);"/>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col slide-out-columnY" :class="{ 'slide-out-columnY': isCameraVisible, 'hidden': !isCameraVisible }">
        <div class="row">
          <div class="col d-flex justify-content-end">
            <button class="px-3 fixed-button button" @click="toggleCamera">
              <div class="row align-items-center">
                <div class="col-auto px-1">
                  <Polygon style="scale: .9;" :class="{ 'poly': !isCameraVisible }"/>
                </div>
                <div class="col px-1">
                  <span class="caption">Вид сзади</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="row" ref="imageRow">
          <div class="col d-flex justify-content-end">
            <img src="/src/assets/image6.png" id="backCam" class="slide-out">
          </div>
        </div>
        
      </div>
      <div class="col-3">
        
      </div>

    </div>
  </div>
</template>

<script>
import Mic from "../assets/mic-fill.svg"
import Sound from "../assets/sound.svg"
import Lights from "../assets/Lights.svg"
import Polygon from "../assets/Polygon.svg"
import EmerStopButton from "./EmerStopButton.vue";
import BatteryInfo from "./BatteryInfo.vue";
import nipplejs from "nipplejs";
import * as roslib from "../../roslib";
import Map from "./maps/Map1.vue";

export default {
  name: "TeleopPage",
  components: { 
    BatteryInfo, 
    EmerStopButton, 
    Lights, 
    Polygon, 
    Sound, 
    Mic, 
    Map,
  },
  data: function () {
    return {
      isCameraVisible: false,
      isOptionsVisible: false,
      isMapVisible: false,
      isSliderVisible: false,
      isStrobeEnabled: false,
      brush_speed: 0,
      brush_angle: 0,
      lin_max_speed: 0,
      ang_max_speed: 0,
      lin_speed: 0,
      ang_speed: 0,
      speed_send_timer: {},
      brush_send_timer: {},
      ros: {},
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
        }
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
      size: 200,
    };
    this.joystick = nipplejs.create(options);
    this.joystick.on('start', this.joystick_start).on('move', this.joystick_move).on('end', this.joystick_end);
    this.speed_send_timer = setInterval(this.send_speed, 200);
    this.brush_send_timer = setInterval(this.send_brush_speed, 300);
    this.ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });
    // Then we create the payload to be published. The object we pass in to ros.Message matches the
    // fields defined in the geometry_msgs/Twist.msg definition.
  },
  methods: {
    disable_brush_speed() {
      this.brush_speed = 0;
    },
    toggleStrobe() {
      this.isStrobeEnabled = !this.isStrobeEnabled;
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
      this.brush_speed = document.getElementById("brush_speed_range1").value;
      this.send_brush_speed();
    },
    set_brush_angle() {
      this.brush_angle = document.getElementById("brush_angle_range").value
    },
    set_linear_speed() {
      this.lin_max_speed = document.getElementById("lin_max_speed_range1").value
    },
    set_angular_speed() {
      this.ang_max_speed = document.getElementById("ang_max_speed_range").value
    },
    set_sm_lights() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });
      if (document.getElementById("sm_lights_check").checked) {
        var request = new ROSLIB.ServiceRequest({
          cmd: "SM_LIGHTS_EN"
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          cmd: "SM_LIGHTS_DIS"
        });
      }

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
    },
    set_strobe_lights() {
      var cmd_srv = new ROSLIB.Service({
        ros: this.ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });
      if (document.getElementById("strobe_lights_check").checked) {
        var request = new ROSLIB.ServiceRequest({
          cmd: "STROBE_EN"
        });
      } else {
        var request = new ROSLIB.ServiceRequest({
          cmd: "STROBE_DIS"
        });
      }

      cmd_srv.callService(request, function (result) {
        // alert('Команда отправлена ' + cmd_srv.name + ': ' + result.success);
      });
    },
    joystick_move(evt, data) {
      this.lin_speed = Math.round(Math.min(Math.max(data.vector.y * (this.lin_max_speed * 0.75) * 0.5 * data.force, -this.lin_max_speed), this.lin_max_speed) * 100) / 100;
      this.ang_speed = -Math.round(Math.min(Math.max(data.vector.x * (this.ang_max_speed * 0.75) * 0.5 * data.force, -this.ang_max_speed), this.ang_max_speed) * 100) / 100;
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
      document.getElementById("lin_max_speed_range").value = 0;
      document.getElementById("ang_max_speed_range").value = 0;
      this.lin_max_speed = 0;
      this.ang_max_speed = 0;
      this.lin_speed = 0;
      this.ang_speed = 0;
    },
    stop_brush() {
      // document.getElementById("brush_enabled").checked = false;
      document.getElementById("brush_speed_range").value = 0;
      this.brush_speed = 0;
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
img {
  box-shadow: 4px -4px 4px 0 rgba(0, 0, 0, .25);
}
.main {
  background: url("/src/assets/image5.png");
  background-size:cover;
  overflow: hidden;
  margin-inline: -.75rem;
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
  transform: translateX(-320px);
}

.slide-out-columnX.mapHide {
  transform: translateX(-320px);
}
.slide-out-columnX.slideHide {
  transform: translateX(-320px);
}

.slide-out-columnY.hidden {
  transform: translateY(calc(156px));

}
.poly {
  transform: scale(-1, -1);
}

#backCam {
  width: 370px;
  height: 156px;
  border-top-left-radius: 1.125rem; 
  border: solid var(--grey2) .125rem;
}

.tongue{
  background-color: var(--bg-tertiary);
  border: solid .125rem var(--grey2);
  border-top-right-radius: 1.125rem;
  border-bottom-right-radius: 1.125rem;
  padding-block: 6px;
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
.buttonSet.mic:active {
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
</style>