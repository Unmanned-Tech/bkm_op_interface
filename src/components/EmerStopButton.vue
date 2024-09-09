<template>
  <div class="modal fade" id="emerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Подтверждение аварийной остановки</h5>
        </div>
        <div class="modal-footer">
          <button  type="button" class="button cancel" data-bs-dismiss="modal"><p class="cap">Отмена</p></button>
          <button v-on:click="send_emerstop()" type="button" class="button" data-bs-dismiss="modal"><p class="cap">Остановить</p></button>
        </div>
      </div>
    </div>
  </div>
  <button class="button px-2" data-bs-toggle="modal" data-bs-target="#emerModal"><p class="cap">Остановить</p></button>
</template>

<script>

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

<style scoped>
.button {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--red);
    border-radius: 1.125rem;
    color: var(--text-color);
    border: none;
    font-weight: 400;
    font-size: 1.5rem;
  }
.cap {
  margin: .5rem .5rem;
}
.cancel {
  background-color: var(--grey2);
}
.modal-title {
  font-weight: 400;
  font-size: 1.5rem;
}
.modal-header {
  border-color: var(--grey);
}
.modal-footer {
  border-color: var(--grey);
}
.modal-content {
  border-radius: 1.125rem; 
}

@media (max-width: 896px) {
  .button {
    font-size: 2cqmax;
    border-radius: .9rem;
  }
}
</style>