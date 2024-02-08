<template>
  <div class="modal fade" id="battInfoModal" tabindex="-1" aria-labelledby="battInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Информация о батарее</h5>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li class="list-group-item">
              Напряжение: {{ rbatt.voltage }}
            </li>
            <li class="list-group-item">
              Температура: {{ rbatt.temperature }}
            </li>
            <li class="list-group-item">
              Статус: {{ rbatt.status }}
            </li>
            <li class="list-group-item">Уровень заряда: {{ rbatt.chargePersantage }}</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
  <button data-bs-toggle="modal" data-bs-target="#battInfoModal"
          class="btn btn-outline-success d-flex justify-content-center align-items-center">
    <i class="bi bi-battery fs-4 me-1"></i>{{ rbatt.chargePersantage }}%
  </button>
</template>

<script>
import axios from "axios";

export default {
  name: "BatteryInfo",
  data() {
    return {
      rbatt: {
        voltage: 1,
        temperature: -1,
        status: -1,
        chargePersantage: -1,
      }
    }
  },
  methods: {
    //TODO: add autoupdate
    fetchRbattPercentage() {
      axios.get('http://192.168.1.1:5003/api/telemetry/rbattery/').then(response => (response.data)).then((data) => {
        this.rbatt = data
      });
    }
  },
  beforeMount() {
    this.fetchRbattPercentage()
  }
}
</script>

<style scoped>

</style>