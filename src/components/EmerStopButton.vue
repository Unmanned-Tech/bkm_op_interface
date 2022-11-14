<template>
  <div class="modal fade" id="emerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="exampleModalLabel">Подтверждение аварийной остановки</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body text-dark">
          Применить аварийную остановку
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Остановить</button>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#emerModal">Аварийная остановка</button>
</template>

<script>
import {Modal} from 'bootstrap'
export default {
  name: "EmerStopButton"
}
</script>

<style scoped>

</style>