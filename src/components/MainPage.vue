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
          <button class="set" @click="lightThemeSwitch">
            <svg width="46" height="46" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.9001 21.5133C42.6767 21.5133 40.9501 18.5266 43.0501 14.8633C44.2634 12.7399 43.5401 10.0333 41.4167 8.81993L37.3801 6.50993C35.5367 5.41327 33.1567 6.0666 32.0601 7.90993L31.8034 8.35327C29.7034 12.0166 26.2501 12.0166 24.1267 8.35327L23.8701 7.90993C22.8201 6.0666 20.4401 5.41327 18.5967 6.50993L14.5601 8.81993C12.4367 10.0333 11.7134 12.7633 12.9267 14.8866C15.0501 18.5266 13.3234 21.5133 9.10008 21.5133C6.67341 21.5133 4.66675 23.4966 4.66675 25.9466V30.0533C4.66675 32.4799 6.65008 34.4866 9.10008 34.4866C13.3234 34.4866 15.0501 37.4733 12.9267 41.1366C11.7134 43.2599 12.4367 45.9666 14.5601 47.1799L18.5967 49.4899C20.4401 50.5866 22.8201 49.9333 23.9167 48.0899L24.1734 47.6466C26.2734 43.9833 29.7267 43.9833 31.8501 47.6466L32.1067 48.0899C33.2034 49.9333 35.5834 50.5866 37.4267 49.4899L41.4634 47.1799C43.5867 45.9666 44.3101 43.2366 43.0967 41.1366C40.9734 37.4733 42.7001 34.4866 46.9234 34.4866C49.3501 34.4866 51.3567 32.5033 51.3567 30.0533V25.9466C51.3334 23.5199 49.3501 21.5133 46.9001 21.5133ZM28.0001 35.5833C23.8234 35.5833 20.4167 32.1766 20.4167 27.9999C20.4167 23.8233 23.8234 20.4166 28.0001 20.4166C32.1767 20.4166 35.5834 23.8233 35.5834 27.9999C35.5834 32.1766 32.1767 35.5833 28.0001 35.5833Z" />
            </svg>
          </button>
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
          <div class="d-flex justify-content-end">
            <router-link to="/logs" class="set">
              <svg width="46" height="46" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.1101 32.8068L44.4735 28.4201C43.8901 27.4634 43.3768 25.6201 43.3768 24.5001V20.1368C43.3768 11.6668 36.4935 4.78345 28.0468 4.78345C19.5768 4.80678 12.6935 11.6668 12.6935 20.1368V24.4768C12.6935 25.5968 12.1801 27.4401 11.6201 28.3968L8.98348 32.7834C7.98015 34.4868 7.74681 36.4234 8.37681 38.1035C9.00681 39.8068 10.4301 41.1601 12.2968 41.7668C14.8168 42.6068 17.3601 43.2135 19.9501 43.6568C20.2068 43.7034 20.4635 43.7268 20.7201 43.7735C21.0468 43.8201 21.3968 43.8668 21.7468 43.9135C22.3535 44.0068 22.9601 44.0768 23.5901 44.1235C25.0601 44.2635 26.5535 44.3335 28.0468 44.3335C29.5168 44.3335 30.9868 44.2635 32.4335 44.1235C32.9701 44.0768 33.5068 44.0301 34.0201 43.9601C34.4401 43.9135 34.8601 43.8668 35.2801 43.7968C35.5368 43.7735 35.7935 43.7268 36.0501 43.6801C38.6635 43.2601 41.2535 42.6068 43.7735 41.7668C45.5701 41.1601 46.9468 39.8068 47.6001 38.0801C48.2535 36.3301 48.0668 34.4168 47.1101 32.8068ZM29.7501 23.3334C29.7501 24.3134 28.9568 25.1068 27.9768 25.1068C26.9968 25.1068 26.2035 24.3134 26.2035 23.3334V16.1001C26.2035 15.1201 26.9968 14.3268 27.9768 14.3268C28.9568 14.3268 29.7501 15.1201 29.7501 16.1001V23.3334Z"/>
                <path d="M34.6033 46.6901C33.6233 49.3967 31.0333 51.3334 27.9999 51.3334C26.1566 51.3334 24.3366 50.5867 23.0533 49.2567C22.3066 48.5567 21.7466 47.6234 21.4199 46.6667C21.7233 46.7134 22.0266 46.7367 22.3533 46.7834C22.8899 46.8534 23.4499 46.9234 24.0099 46.9701C25.3399 47.0867 26.6933 47.1567 28.0466 47.1567C29.3766 47.1567 30.7066 47.0867 32.0133 46.9701C32.5033 46.9234 32.9933 46.9001 33.4599 46.8301C33.8333 46.7834 34.2066 46.7367 34.6033 46.6901Z"/>
              </svg>
            </router-link>
          </div>
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
          <div class="col">
            <button class="stop"><p class="capbtn">Остановить</p></button>
          </div>
          <div class="col">
            <button class="stop clean"><p class="capbtn">Уборка</p></button>
          </div>
          <div class="col d-flex justify-content-end">
            <button class="other">
              <svg width="50" height="50" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 33.25C7.60051 33.25 5.25 30.8995 5.25 28C5.25 25.1005 7.60051 22.75 10.5 22.75C13.3995 22.75 15.75 25.1005 15.75 28C15.75 30.8995 13.3995 33.25 10.5 33.25ZM28 33.25C25.1005 33.25 22.75 30.8995 22.75 28C22.75 25.1005 25.1005 22.75 28 22.75C30.8995 22.75 33.25 25.1005 33.25 28C33.25 30.8995 30.8995 33.25 28 33.25ZM45.5 33.25C42.6005 33.25 40.25 30.8995 40.25 28C40.25 25.1005 42.6005 22.75 45.5 22.75C48.3995 22.75 50.75 25.1005 50.75 28C50.75 30.8995 48.3995 33.25 45.5 33.25Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/image7.jpg">
        <div class="row mt-3">
          <div class="col">
            <button class="stop"><p class="capbtn">Остановить</p></button>
          </div>
          <div class="col">
            <button class="stop clean"><p class="capbtn">Уборка</p></button>
          </div>
          <div class="col d-flex justify-content-end">
            <button class="other">
              <svg width="50" height="50" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 33.25C7.60051 33.25 5.25 30.8995 5.25 28C5.25 25.1005 7.60051 22.75 10.5 22.75C13.3995 22.75 15.75 25.1005 15.75 28C15.75 30.8995 13.3995 33.25 10.5 33.25ZM28 33.25C25.1005 33.25 22.75 30.8995 22.75 28C22.75 25.1005 25.1005 22.75 28 22.75C30.8995 22.75 33.25 25.1005 33.25 28C33.25 30.8995 30.8995 33.25 28 33.25ZM45.5 33.25C42.6005 33.25 40.25 30.8995 40.25 28C40.25 25.1005 42.6005 22.75 45.5 22.75C48.3995 22.75 50.75 25.1005 50.75 28C50.75 30.8995 48.3995 33.25 45.5 33.25Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/image7.jpg">
        <div class="row mt-3">
          <div class="col">
            <button class="stop"><p class="capbtn">Остановить</p></button>
          </div>
          <div class="col">
            <button class="stop clean"><p class="capbtn">Уборка</p></button>
          </div>
          <div class="col d-flex justify-content-end">
            <button class="other">
              <svg width="50" height="50" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 33.25C7.60051 33.25 5.25 30.8995 5.25 28C5.25 25.1005 7.60051 22.75 10.5 22.75C13.3995 22.75 15.75 25.1005 15.75 28C15.75 30.8995 13.3995 33.25 10.5 33.25ZM28 33.25C25.1005 33.25 22.75 30.8995 22.75 28C22.75 25.1005 25.1005 22.75 28 22.75C30.8995 22.75 33.25 25.1005 33.25 28C33.25 30.8995 30.8995 33.25 28 33.25ZM45.5 33.25C42.6005 33.25 40.25 30.8995 40.25 28C40.25 25.1005 42.6005 22.75 45.5 22.75C48.3995 22.75 50.75 25.1005 50.75 28C50.75 30.8995 48.3995 33.25 45.5 33.25Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <img class="img-fluid rounded-4 map" v-bind:src="imeg_path">
      </div>
      <div class="col">
        <img class="img-fluid rounded-4 map" v-bind:src="imeg_path">
      </div>
      <div class="col">
        <img class="img-fluid rounded-4 map" v-bind:src="imeg_path">
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import * as roslib from "../../roslib.js";

export default {
  name: "RobotPage",
  components: {},
  data: function () {
    return {
      rstatus: 1,
      refresh_timer: '',
      imeg_path: "/src/assets/map-dark.png",
      images: [
        "/src/assets/map-dark.png",
        "/src/assets/map-light.png",
      ],
      currentImageIndex: 0,
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
    changeImage() {
      this.currentImageIndex = 1 - this.currentImageIndex;
      this.imeg_path = this.images[this.currentImageIndex];
    },
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
    _addLightTheme() {
      let lightThemeLinkEl = document.createElement("link");
      lightThemeLinkEl.setAttribute("rel", "stylesheet");
      lightThemeLinkEl.setAttribute("href", "/src/assets/lightTheme.scss");
      lightThemeLinkEl.setAttribute("id", "light-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(lightThemeLinkEl);
    },
    _removeLightTheme() {
      let lightThemeLinkEl = document.querySelector("#light-theme-style");
      let parentNode = lightThemeLinkEl.parentNode;
      parentNode.removeChild(lightThemeLinkEl);
    },
    lightThemeSwitch() {
      let lightThemeLinkEl = document.querySelector("#light-theme-style");
      if (!lightThemeLinkEl) {
          this._addLightTheme()
      } else {
          this._removeLightTheme()
      }
      this.changeImage();
    }
  }
}
</script>
<style scoped>

  .set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.3125rem;
    border-radius: 1.125rem;
    position: absolute;
    border: none;
  }
  
  .caption{
    font: 400 2rem "SF Pro Display";
    text-align: center;
  }

  .stop {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--red);
    border-radius: 1.125rem;
    /* margin-top: .75rem; */
    color: var(--text-color);
    border: none;
    font: 400 1.75rem "SF Pro Display";
  }

  .clean {
    background-color: var(--green);
    
  }

  .other {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.3125rem;
    border-radius: 1.125rem;
    border: none;
  }

  .capbtn {
    margin: .75rem;
  }

  .map {
    border: solid var(--grey2) .25rem;
  }
  img {
    line-height: normal;
  }

</style>