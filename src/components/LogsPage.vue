<template>
  <div>
    <h1 class="mt-5">Логи</h1>
    <div class="row">
      <div class="col-12">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Робот</th>
            <th scope="col">Время</th>
            <th scope="col">Сообщение</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-primary">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Задача запущена</td>

          </tr>
          <tr class="text-success">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Зарядка завершена</td>

          </tr>
          <tr class="text-info">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Зарядка начата</td>

          </tr>
          <tr class="text-warning">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Низкий заряд батареи</td>

          </tr>
          <tr class="text-primary">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Задача запущена</td>

          </tr>
          <tr class="text-warning">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Потеряно соединение</td>
          </tr>
          <tr class="text-warning">
            <td>БКМ 1</td>
            <td>15-35 20.11.2022</td>
            <td>Потеряно соединение</td>
          </tr>


          </tbody>
        </table>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "logs"
}
</script>

<style scoped>

</style>