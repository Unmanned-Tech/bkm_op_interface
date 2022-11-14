<template>
  <div class="container mt-3">
    <h1>Настройки</h1>
    <hr>
    <div class="row">
      <div class="col-12">
        <h3>Настройки роботов</h3>
        <table class="table  rounded-2 shadow-sm">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Префикс</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>БКМ 1</td>
            <td class="">bkm_1</td>
            <td class="text-center">
              <button class="btn btn-secondary me-3">Проверить соединение</button>
              <button class="btn btn-primary me-3">Редактировать</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>БКМ 2
            </td>
            <td class="">bkm_2</td>
            <td class="text-center">
              <button class="btn btn-secondary me-3">Проверить соединение</button>
              <button class="btn btn-primary me-3">Редактировать</button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>БКМ 3</td>
            <td class="">bkm_3</td>
            <td class="text-center">
              <button class="btn btn-secondary me-3">Проверить соединение</button>
              <button class="btn btn-primary me-3">Редактировать</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row mt-3">
      <h3>Настройки уведомлений</h3>
      <div class="col">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Флажок по умолчанию
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
          <label class="form-check-label" for="flexCheckChecked">
            Выбранный флажок
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage.vue"
}
</script>

<style scoped>

</style>