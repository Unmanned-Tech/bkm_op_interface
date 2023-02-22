<template>
  <div class="container">
    <h1 class="mt-3">Удалённое управление: <u>БКМ 1</u></h1>
    <div class="row mt-3 p-3 topmenu shadow rounded-2 justify-content-center">
      <div class="col col-auto me-auto">
        <RouterLink to="/robot" class="btn btn-primary">Назад</RouterLink>
      </div>

      <div class="col col-auto">
        <emer-stop-button />
      </div>
      <div class="col">
        <BatteryInfo />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-8">
        <div class="row m-1">
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
        <img class="img-fluid rounded-4 h-50 mt-2 " src="/map_placeholder.png" />
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-12 ">
            <h3 class="text-center">Управление</h3>
            <div class="card bg-light">
              <div class="card-body text-dark">

                <div class="row">

                  <div class="col-4">
                    <div class="form-check form-switch">
                      <input class="form-check-input big-check-box" type="checkbox" role="switch"
                        id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Фары</label>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="form-check form-switch" style="">
                      <input class="form-check-input big-check-box" type="checkbox" role="switch"
                        id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault"> Проблесковые маячки</label>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row mt-3">
                  <div class="col-auto">
                    <button class="btn btn-sm btn-primary">Звуковой сигнал</button>
                  </div>
                </div>
                <hr>
                <div class="row mt-3">
                  <div class="col-auto">
                    <div class="form-check form-switch" style="">
                      <input class="form-check-input big-check-box" type="checkbox" role="switch"
                        id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Щетка</label>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <label for="customRange3" class="form-label">Скорость вращения (об/мин): {{ shetka_speed }}</label>
                    <input v-on:input="set_shetka_speed" type="range" class="form-range" min="0" max="200" step="0.5"
                      id="shetka_speed_range" value="0">
                  </div>
                </div>
                <hr>
                <div class="row mt-3">
                  <div class="col-auto">
                    <div class="form-check form-switch " style="">
                      <input class="form-check-input big-check-box" style="" type="checkbox" role="switch"
                        id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Управление движением</label>
                    </div>
                    <div class="col-12">
                      <label for="customRange3" class="form-label">Линейная скорость (м/c): {{ lin_max_speed }}</label>
                      <input v-on:input="set_linear_speed" type="range" class="form-range" min="0" max="10" step="0.5"
                        id="lin_max_speed_range" value="0">
                    </div>
                    <div class="col-12">
                      <label for="customRange3" class="form-label">Угловая скорость (рад/c): {{ ang_max_speed }}</label>
                      <input v-on:input="set_angular_speed" type="range" class="form-range" min="0" max="10" step="0.5"
                        id="ang_max_speed_range" value="0">
                    </div>
                    <div class="col-auto mt-3">
                      <div id="zone_joystick" class="" style="width: 100px; height: 100px;"></div>
                    </div>
                  </div>
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
import { resolveDirective } from "vue";

export default {
  name: "TeleopPage",
  components: { BatteryInfo, EmerStopButton },
  data: function () {
    return {
      shetka_speed: 0,
      lin_max_speed: 0,
      ang_max_speed: 0,
    }
  },
  mounted: function () {
    var options = {
      zone: document.getElementById('zone_joystick'),
      mode: 'static',
      color: 'blue',
      position: {
        left: '50%',
        bottom: '12%'
      },
    };
    var manager = nipplejs.create(options);
  },
  methods: {
    set_shetka_speed() {
      this.shetka_speed = document.getElementById("shetka_speed_range").value
    },
    set_linear_speed() {
      this.lin_max_speed = document.getElementById("lin_max_speed_range").value
    },
    set_angular_speed() {
      this.ang_max_speed = document.getElementById("ang_max_speed_range").value
    },
  }
}
</script>

<style scoped lang="scss">
.big-check-box {
  width: 2vw;
  height: 2vh;
  margin-right: 1rem;
}
</style>