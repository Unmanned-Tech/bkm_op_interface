<template>
  <div class="container-fluid">
    <h1 class="mt-3">Удалённое управление: <u>БКМ 1</u></h1>
    <div class="row mt-3 p-3 topmenu shadow rounded-2 justify-content-center">
      <div class="col-2 col-auto me-auto d-flex justify-content-center align-items-center">
        <RouterLink to="/status" class="btn btn-primary">Статус</RouterLink>
      </div>
      <div class="col col-auto me-auto d-flex justify-content-center align-items-center">
        <emer-stop-button />
      </div>
      <div class="col col-auto d-flex justify-content-center align-items-center">
        <BatteryInfo />
      </div>
      <!-- <div class="col col-auto d-flex justify-content-center align-items-center">
        <img v-bind:src="svgPath" class="img-fluid">
      </div> -->
      <!-- <div class="col" id="app">{{ currentTime }}</div> -->
      <div class="col col-auto d-flex justify-content-center align-items-center">
        <RouterLink to="/" class="btn btn-primary">На главную</RouterLink>
      </div>
      <div class="col col-auto me-5 d-flex justify-content-center align-items-center">
        <RouterLink to="/robot" class="btn btn-primary">Назад</RouterLink>
      </div>
</div>
    <div class="row mt-3">
      <div class="col-6">
        <div class="row ">
          <div class="col">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Карта</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Видео</a>
              </li>

              <li class="nav-item">
                <a class="nav-link disabled">Лидар</a>
              </li>

            </ul>
          </div>
        </div>
        <div id="teleop_view"></div>
        <img class="img-fluid rounded-4  mt-2 " src="/map_placeholder.png" />
      </div>
      <div class="col-4">
        <div class="row mt-5">
          <div class="col-12">

            <div class="card bg-dark">
              <div class="card-body text-light">
                <h4 class="text-center">Управление</h4>
                <div class="row">
                  <div class="row mt-1">
                    <div class="col-auto">
                      <div class="form-check form-switch" style="">
                        <input class="form-check-input big-check-box" type="checkbox" role="switch" id="shetka_enabled">
                        <label class="form-check-label" for="shetka_enabled">Щетка</label>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-12">
                      <label for="shetka_speed_range1" class="form-label">Скорость (об/мин): {{ shetka_speed }}</label>
                      <input v-on:input="set_shetka_speed" type="range" class="form-range" min="-50" max="200" step="1"
                        id="shetka_speed_range" value="0">
                    </div>

                  </div>
                  <div class="row ">
                    <div class="col-12">
                      <label for="shetka_angle_range" class="form-label">Поворот: {{ shetka_angle }}</label>
                      <input v-on:input="set_shetka_angle" type="range" class="form-range" disabled min="-1" max="1"
                        step="0.1" id="shetka_angle_range" value="0">
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-12">
                      <button v-on:click="stop_shetka" class="btn btn-warning w-100 ">Остановка щётки</button>
                    </div>

                  </div>

                  <div class="row mt-1">
                    <div class="col-auto">
                      <hr>
                      <div class="form-check form-switch " style="">
                        <input class="form-check-input big-check-box" style="" type="checkbox" role="switch"
                          id="moveing_enable">
                        <label class="form-check-label" for="moveing_enable">Управление движением</label>
                      </div>
                      <div class="row mt-1">
                        <div class="col-12">
                          <button v-on:click="stop_moving" class="btn btn-warning shadow-sm w-100 ">Стоп</button>
                        </div>
                      </div>
                      <div class="col-12 mt-3">
                        <label for="customRange3" class="form-label">Линейная скорость (м/c): {{ lin_max_speed }}</label>
                        <input v-on:input="set_linear_speed" type="range" class="form-range" min="0" max="10" step="0.5"
                          id="lin_max_speed_range" value="0">
                      </div>
                      <div class="col-12">
                        <label for="customRange3" class="form-label">Угловая скорость (рад/c): {{ ang_max_speed }}</label>
                        <input v-on:input="set_angular_speed" type="range" class="form-range" min="0" max="10" step="0.5"
                          id="ang_max_speed_range" value="0">
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="card bg-dark h-25 mt-5">
          <div class="card-body text-dark">
            <div class="row justify-content-center">
              <div id="zone_joystick" class="zone static" style="width: 100px; height: 100px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row-1">
        <div class="col-12 mt-1">
          <div class="card bg-dark">
            <div class="card-body text-light">
              <div class="row">

                <div class="col-auto">
                  <div class="form-check form-switch">
                    <input class="form-check-input big-check-box" v-on:change="set_sm_lights" type="checkbox"
                      role="switch" id="sm_lights_check">
                    <label class="form-check-label" for="sm_lights_check">Габариты</label>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="form-check form-switch" style="">
                    <input class="form-check-input big-check-box" v-on:change="set_strobe_lights" type="checkbox" role="switch"
                      id="strobe_lights_check">
                    <label class="form-check-label" for="strobe_lights_check">Проблесковые маячки</label>
                  </div>

                </div>
                <div class="col-auto">
                  <button class="btn btn-sm btn-primary">Звуковой сигнал</button>
                </div>

              </div>
              <hr>
              <div class="row">
                <label class="form-check-label" for="cmd1">Команда</label>
                <div class="col-auto">
                  <input id="cmd1" type="text" class="form-control bg-light text-dark" />
                </div>
                <div class="col">
                  <button v-on:click="send_cmd" class="btn btn-primary ">Отправить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      color: 'white',
      position: {
        left: '50%',
        bottom: '12%'
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

<style scoped lang="scss">
.big-check-box {
  // width: 2vw;
  // height: 2vh;
  // margin-right: 1rem;
}

.zone {
  // display: none;
  position: absolute;
  width: 200px;
  height: 200px;
  // left: 100%;
}

.zone.static {
  // background: rgba(255, 0, 0, 0.1);
}

#zone_joystick {
 
}


</style>