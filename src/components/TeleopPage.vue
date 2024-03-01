<template>
  <main>
    <div class="row">
      <div class="col map-col">
        <Map class="map mt-2 ms-2"/>
      </div>
      <div class="col">
      </div>
      <div class="col mt-5">
        <div class="row mt-5 align-items-center">
          <div class="col mb-5 d-flex justify-content-center">
            <EmerStopButton/>
          </div>
        </div>
        <div class="row mt-4 justify-content-center">
          <div id="zone_joystick" class="zone static"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        
      </div>
      <div class="col-5 slide-out-column" :class="{ 'slide-out-column': isColumnVisible, 'hidden': !isColumnVisible }">
        <div class="row">
          <div class="col d-flex justify-content-end">
            <button class="px-3 fixed-button button" @click="toggleColumn">
              <div class="row align-items-center">
                <div class="col-1">
                  <Polygon :class="{ 'poly': !isColumnVisible }"/>
                </div>
                <div class="col px-1">
                  <span class="caption">Вид сзади</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div class="row" ref="imageRow">
          <div class="col">
            <img src="/src/assets/image6.png" id="backCam" class="img-fluid slide-out">
          </div>
        </div>
        
      </div>
      <div class="col">
        
      </div>

    </div>
  </main>
</template>

<script setup>

</script>

<script>
import Mic from "../assets/mic-fill.svg"
import Sound from "../assets/Vector.svg"
import Lights from "../assets/Lights.svg"
import Polygon from "../assets/Polygon.svg"
import EmerStopButton from "./EmerStopButton.vue";
import BatteryInfo from "./BatteryInfo.vue";
import nipplejs from "nipplejs";
import * as roslib from "../../roslib";
import Map from "./maps/Map1.vue"

export default {
  name: "TeleopPage",
  components: { BatteryInfo, EmerStopButton, Lights, Polygon, Sound, Mic, Map },
  data: function () {
    return {
      isColumnVisible: false,
      shetka_speed: 0,
      shetka_angle: 0,
      lin_max_speed: 0,
      ang_max_speed: 0,
      lin_speed: 0,
      ang_speed: 0,
      speed_send_timer: {},
      shetka_send_timer: {},
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
    this.shetka_send_timer = setInterval(this.send_shetka_speed, 300);
    this.ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });
    // Then we create the payload to be published. The object we pass in to ros.Message matches the
    // fields defined in the geometry_msgs/Twist.msg definition.
  },
  methods: {
    toggleColumn() {
      this.isColumnVisible = !this.isColumnVisible;
    },
    set_shetka_speed() {
      this.shetka_speed = document.getElementById("shetka_speed_range").value;
      send_shetka_speed();
    },
    set_shetka_angle() {
      this.shetka_angle = document.getElementById("shetka_angle_range").value
    },
    set_linear_speed() {
      this.lin_max_speed = document.getElementById("lin_max_speed_range").value
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
        this.lin_speed = Math.round(data.vector.y * this.lin_max_speed * 0.5 * data.force * 100) / 100;
        this.ang_speed = -Math.round(data.vector.x * this.ang_max_speed * 0.5 * data.force * 100) / 100;
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
    stop_shetka() {
      // document.getElementById("shetka_enabled").checked = false;
      document.getElementById("shetka_speed_range").value = 0;
      this.shetka_speed = 0;
    },
    // send_shetka_speed() {
    //   if (document.getElementById("shetka_enabled").checked) {
    //     this.ceVel = new ROSLIB.Topic({
    //       ros: this.ros,
    //       name: '/ce_vel',
    //       messageType: 'geometry_msgs/Twist'
    //     });
    //     this.twist_ce.linear.x = Math.round(this.shetka_speed);
    //     this.twist_ce.angular.z = Math.round(this.shetka_speed);
    //     this.ceVel.publish(this.twist_ce);
    //     // alert("ss");
    //   }

    // },
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
}


</script>

<style scoped>
img {
  box-shadow: 4px -4px 4px 0 rgba(0, 0, 0, .25);
}
main {
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
  height: 15.528rem;
}
.map {
  border: solid var(--grey2) .25rem;
  border-radius: 1.125rem;
}
.map:hover, .map:active {
  transition: opacity .5s;
  opacity: 1;
}
.caption {
  font-size: 1.5rem;
  color: var(--text-color);
}
.button {
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem 1.125rem 0 0;
  border: solid .125rem var(--grey2);
  z-index: 1;
}
.slide-out-column {
  transition: transform .5s ease-out;
  transform: translateY(0);
}

.slide-out-column.hidden {
  transform: translateY(calc(181px + 4px));

}
.poly {
  transform: scale(-1, -1);
}

#backCam {
  width: 500px;
  height: 185px;
  border-top-left-radius: 1.125rem; 
  border: solid var(--grey2) .125rem;
}

</style>