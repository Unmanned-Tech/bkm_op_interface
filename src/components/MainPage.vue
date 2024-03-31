<template>
  <div>
    <div class="row mt-3">
        <div class="col">
          <ThemeSwithcer></ThemeSwithcer>
          <p class="caption mt-4 mb-2">
            БКМ-1: <span style="color: var(--green);">Уборка</span><br/>
            Общее состояние: <span style="color: var(--green);">Хорошо</span><br/>
          </p>
        </div>
        <div class="col">
          <p class="caption mt-4 mb-2">
            БКМ-2: <span style="color: var(--blue);">Уборка</span><br/> 
            Общее состояние: <span style="color: var(--orange);">Есть ограничения</span>
          </p>
        </div>
        <div class="col">
          <NotificationBell></NotificationBell>
          <p class="caption mt-4 mb-2">
            БКМ-3: <span style="color: var(--blue);">Подзарядка</span><br/> 
            Общее состояние: <span style="color: var(--red);">Плохо</span>
          </p>
        </div>
      </div>
    <div class="row">
      <div class="col">
        <div class="ImageDiv">
          <img class="img-fluid rounded-4" :src="streamSrc" @error="handleError" @load="handleLoad">
        </div>
        <div class="row mt-4">
          <MPButtons1 />
        </div>
      </div>
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/black-screen.jpg">
        <div class="row mt-4">
          <MPButtons2 />
        </div>
      </div>
      <div class="col">
        <img class="img-fluid rounded-4" src="../assets/black-screen.jpg">
        <div class="row mt-4">
          <MPButtons3 />
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col ">
        <Map3 class="map" />
      </div>
      <div class="col">
        <Map2 class="map" />
      </div>
      <div class="col">
        <Map1 class="map" />
      </div>
    </div>
  </div>
</template>

  
<script>

import NotificationBell from './SvgComponents/NotificationBell.vue';
import ThemeSwithcer from './SvgComponents/ThemeSwithcer.vue';
import MPButtons1 from './ButtonsBKM/MPButtons1.vue';
import MPButtons2 from './ButtonsBKM/MPButtons2.vue';
import MPButtons3 from './ButtonsBKM/MPButtons3.vue';

import Map1 from './maps/Map1.vue';
import Map2 from './maps/Map2.vue';
import Map3 from './maps/Map3.vue';

import axios from 'axios';
import * as roslib from "../../roslib.js";
import { handleError } from 'vue';

export default {
  name: "RobotPage",
  components: {
    MPButtons1,
    MPButtons2,
    MPButtons3,
    ThemeSwithcer,
    NotificationBell,

    Map1,
    Map2,
    Map3,

  },
  data: function () {
    return {
      rstatus: 1,
      refresh_timer: '',
      streamSrc: 'http://192.168.1.46:8080/stream',
      placeholderSrc: '/src/assets/black-screen.jpg',
      loaded: false,
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
    setTimeout(() => {
      this.handleError();
    }, 100);
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
    handleError() {
      if(!this.loaded) {
        this.streamSrc = this.placeholderSrc;
      }
    },
    handleLoad() {
      this.loaded = true;
    }
  }
}
</script>
<style scoped>
  .ImageDiv {
    height: 189.5px;
  }
  .caption{
    font-weight: 400;
    font-size: 1.25rem;
    text-align: center;
    line-height: normal;
    color: var(--text-color);
  }

  .map {
    border: solid var(--grey2) .25rem;
    height: 15.528rem;
    border-radius: 1.125rem;
    
  }
  img {
    line-height: normal;
  }

</style>