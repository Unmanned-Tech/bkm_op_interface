<template>
    <div class="row justify-content-end mt-3">
      <div class = "col d-flex">
      <img class="img-fluid rounded-4 map ms-4" src="../assets/map-dark.png">
    </div>
    <div class = "col-2 d-flex justify-content-center mt-5 me-5 button">
      <EmerStopButton></EmerStopButton>
      
    </div> </div>
    <div class="col">
      <div class="row mt-5 justify-content-end">
      <div id="zone_joystick" class="zone_static" style="width: 100px; height: 100px;">
      </div>
    </div>
    </div>
</template>

<script>
import EmerStopButton from "./EmerStopButton.vue";
import BatteryInfo from "./BatteryInfo.vue";
import nipplejs from "nipplejs";
import * as roslib from "../../roslib.js";
import { resolveDirective } from "vue";

export default {
  name: "TeleopPage",
  components: { BatteryInfo, EmerStopButton },
  data: function () {
    return {
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
      localdate: "",
      svgPath: '/Vector.svg',
    };
  },
  mounted: function () {
    var options = {
      zone: document.getElementById('zone_joystick'),
      mode: 'static',
      color: 'gray',
      position: {
        left: '81%',
        bottom: '40%'
      },
      multitouch: {
        touchRadius: '100%',
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
      if (document.getElementById("moveing_enable").checked) {
        this.lin_speed = Math.round(data.vector.y * this.lin_max_speed * 0.5 * data.force * 100) / 100;
        this.ang_speed = -Math.round(data.vector.x * this.ang_max_speed * 0.5 * data.force * 100) / 100;
      } else {
        this.lin_speed = 0;
        this.ang_speed = 0;
      }

    },
    joystick_start(evt, data) {

    },
    joystick_end(evt, data) {
      this.lin_speed = 0;
      this.ang_speed = 0;
    },
    send_speed() {
      if (document.getElementById("moveing_enable").checked) {
        this.cmdVel = new ROSLIB.Topic({
          ros: this.ros,
          name: '/cmd_vel',
          messageType: 'geometry_msgs/Twist'
        });
        this.twist.linear.x = this.lin_speed;
        this.twist.angular.z = this.ang_speed;
        this.cmdVel.publish(this.twist);
      }
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
      document.getElementById("shetka_enabled").checked = false;
      document.getElementById("shetka_speed_range").value = 0;
      this.shetka_speed = 0;
    },
    send_shetka_speed() {
      if (document.getElementById("shetka_enabled").checked) {
        this.ceVel = new ROSLIB.Topic({
          ros: this.ros,
          name: '/ce_vel',
          messageType: 'geometry_msgs/Twist'
        });
        this.twist_ce.linear.x = Math.round(this.shetka_speed);
        this.twist_ce.angular.z = Math.round(this.shetka_speed);
        this.ceVel.publish(this.twist_ce);
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
}


</script>

<style scoped>
.caption {
  font: 400 1.25rem "SF Pro Display";
}
.map {
    border: solid var(--grey2) .125rem;
    width: 20%;
    position: absolute;
  }
.button{
 padding-right: 10rem;
}

</style>