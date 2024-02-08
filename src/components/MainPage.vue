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

import NotificationBell from './SvgComponents/NotificationBell.vue'
import ThemeSwithcer from './SvgComponents/ThemeSwithcer.vue';
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
    font: 400 1.25rem "SF Pro Display";
    text-align: center;
    line-height: normal;
    color: var(--text-color);
  }

  .map {
    border: solid var(--grey2) .25rem;
  }
  img {
    line-height: normal;
  }

</style>