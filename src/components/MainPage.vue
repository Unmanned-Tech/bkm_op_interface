<template>
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
            <table class="table  ">
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
                        <td class="text-success">Уборка ({{rstatus}})</td>
                        <td class="text-center"><RouterLink to="robot"><button class="btn btn-primary">Подробнее</button></RouterLink></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>БКМ 2
                        </td>
                        <td  class="text-warning">Нет соединения</td>
                        <td class="text-center"><button class="btn  btn-primary disabled">Подробнее</button></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>БКМ 3</td>
                        <td class="text-warning" >Нет соединения</td>
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
    </div>

</template>
<script>
import axios from 'axios'
export default {
  name: "RobotPage",
  components: {},
  data: function () {
    return {
      rstatus: 0,
      refresh_timer: ''
    }
  },
  mounted: function () {
    this.startRefreshing();
  },
  beforeUnmount() {
    this.stopRefreshing();
  },
  methods: {
    showConfirmModal() {
      console.info("pressed");
    },
    fetchRstatus () {
      axios
          .get('http://localhost:5003/api/telemetry/rstatus/')
          .then(response => (this.rstatus = response.data))
      console.info("statuses updated")
    },
    startRefreshing(){
      this.refresh_timer = setInterval(this.fetchRstatus, 1000);
    },
    stopRefreshing(){
      clearInterval(this.refresh_timer);
      console.info("refreshing stoped")
    },
  }
}
</script>
<style scoped>
</style>