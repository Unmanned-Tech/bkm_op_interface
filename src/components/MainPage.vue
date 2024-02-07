<!-- <template>
  <div class="row mt-3">
    <div class="col-6">
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
      <img class="img-fluid rounded-4 h-75 mt-2" src="/map_placeholder.png" />
    </div>
    <div class="col-6">

      <div class="ps-3 pe-3 pb-2 rounded-2">
        <h2 class="mb-3 mt-3">Роботы</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Статус</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>БКМ 1</td>
              <td class="text-success">Уборка ({{ rstatus }})</td>
              <td class="text-center">
                <RouterLink to="robot"><button class="btn btn-primary">Подробнее</button></RouterLink>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>БКМ 2
              </td>
              <td class="text-warning">Нет соединения</td>
              <td class="text-center"><button class="btn  btn-primary disabled">Подробнее</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>БКМ 3</td>
              <td class="text-warning">Нет соединения</td>
              <td class="text-center"><button class="btn disabled  btn-primary">Подробнее</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="mt-5">Уведомления</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Робот</th>
            <th scope="col">Время</th>
            <th scope="col">Сообщение</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-warning">
            <td>БКМ 2</td>
            <td>15-35 20.11.2022</td>
            <td>Нет соединения</td>
            <td><button class="btn btn-outline-danger"><i class="bi bi-x-lg"></i></button></td>
          </tr>
          <tr class="text-success">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Зарядка завершена</td>
            <td><button class="btn btn-outline-danger"><i class="bi bi-x-lg"></i></button></td>
          </tr>
          <tr class="text-info">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Зарядка начата</td>
            <td><button class="btn btn-outline-danger"><i class="bi bi-x-lg"></i></button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>  -->
  <template>
      <div class="row mt-3">
        <div class="col">
          <ThemeSwithcer></ThemeSwithcer>
          <p class="caption mt-4 mb-2">
            БКМ-1: Уборка<br/> 
            Общее состояние: Хорошо
          </p>
        </div>
        <div class="col">
          <p class="caption mt-4 mb-2">
            БКМ-2: Уборка<br/> 
            Общее состояние: Есть ограничения
          </p>
        </div>
        <div class="col">
          <NotificationBell></NotificationBell>
          <p class="caption mt-4 mb-2">
            БКМ-3: Подзарядка<br/> 
            Общее состояние: Плохо
          </p>
        </div>
      </div>
    <div class="row">
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/image7.jpg">
        <div class="row mt-3">
          <MainPageButtons></MainPageButtons>
        </div>
      </div>
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/image7.jpg">
        <div class="row mt-3">
          <MainPageButtons></MainPageButtons>
        </div>
      </div>
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/image7.jpg">
        <div class="row mt-3">
          <MainPageButtons></MainPageButtons>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col ">
        <img class="img-fluid rounded-4 map" src="../assets/map-dark.png">
      </div>
      <div class="col">
        <img class="img-fluid rounded-4 map" src="../assets/map-dark.png">
      </div>
      <div class="col">
        <img class="img-fluid rounded-4 map" src="../assets/map-dark.png">
      </div>
    </div>
  </template>

  
<script>
import NotificationBell from './NotificationBell.vue'
import ThemeSwithcer from './ThemeSwithcer.vue';
import MainPageButtons from './MainPageButtons.vue';
import axios from 'axios';
import * as roslib from "../../roslib.js";

export default {
  name: "RobotPage",
  components: {
    MainPageButtons,
    ThemeSwithcer,
    NotificationBell,
  },
  data: function () {
    return {
      rstatus: 1,
      refresh_timer: '',
      
    }
  },
  mounted: function () {
    // this.startRefreshing();
    const ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });

    ros.on('connection', function () {
      console.log('Connected to websocket server.');
    });

    var listener = new ROSLIB.Topic({
      ros: ros,
      name: '/c2_telem',
      messageType: 'mcu_msgs/msg/BldcStatus'
    });
    listener.subscribe(function (message) {
      console.log('Received message on ' + listener.name + ': ' + message.bat_voltage);
      
      // If desired, we can unsubscribe from the topic as well.
      
    });


  },
  beforeUnmount() {
    // this.stopRefreshing();
  },
  methods: {
    
    showConfirmModal() {
      console.info("pressed");
    },
    fetchRstatus() {
      axios
        .get('http://192.168.1.1:5003/api/telemetry/rstatus/')
        .then(response => (this.rstatus = response.data))
      console.info("statuses updated")
    },
    startRefreshing() {
      this.refresh_timer = setInterval(this.fetchRstatus, 1000);
    },
    stopRefreshing() {
      clearInterval(this.refresh_timer);
      console.info("refreshing stoped")
    },
  }
}
</script>
<style scoped>
  
  .caption{
    font: 400 2rem "SF Pro Display";
    text-align: center;
  }

  .map {
    border: solid var(--grey2) .25rem;
  }
  img {
    line-height: normal;
  }

</style>