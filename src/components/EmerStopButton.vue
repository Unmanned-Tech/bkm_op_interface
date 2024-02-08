<template>
  <div class="modal fade" id="emerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Подтверждение аварийной остановки</h5>
        </div>
        <div class="modal-body">
          Применить аварийную остановку
        </div>
        <div class="modal-footer">
          <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button v-on:click="send_emerstop()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Остановить</button>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#emerModal">Аварийная остановка</button>
</template>

<script>
import { Modal } from 'bootstrap'
import * as roslib from "../../roslib.js";


export default {
  name: "EmerStopButton",
  methods: {
    send_emerstop() {
      const ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });
      console.info("EmerStop");
      var EmerStopSrv = new ROSLIB.Service({
        ros: ros,
        name: '/bkm_cmd_srv',
        serviceType: 'mcu_msgs/srv/TextCmd'
      });
      var request = new ROSLIB.ServiceRequest({
        cmd: "EMER_STOP"
      });
      EmerStopSrv.callService(request, function (result) {
        console.log('Result for service call on ' + EmerStopSrv.name + ': ' + result.success);
      });
    },
  }

}

</script>

<style scoped></style>