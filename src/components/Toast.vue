<template>
    <div class="toast align-items-center text-bg-danger border-0 w-100" role="alert" aria-live="assertive" aria-atomic="true" id="myToast">
        <div class="d-flex">
            <div class="toast-body">
                Система навигации БКМ-1 потеряла сигнал
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    <div class="toast align-items-center text-bg-success border-0 mt-2 w-100" role="alert" aria-live="assertive" aria-atomic="true" id="myToast1">
        <div class="d-flex">
            <div class="toast-body">
                Уборка района №1 завершена успешно
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    <div class="toast align-items-center text-bg-warning border-0 mt-2 w-100" role="alert" aria-live="assertive" aria-atomic="true" id="myToast2">
        <div class="d-flex">
            <div class="toast-body">
                Уровень заряда батареи БКМ-3 ниже 20%
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    <div class="toast align-items-center text-bg-primary border-0 mt-2 w-100" role="alert" aria-live="assertive" aria-atomic="true" id="myToast3">
        <div class="d-flex">
            <div class="toast-body">
                БКМ-3 вернулась на базу для плановой зарядки
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>

<script scoped>
import { Toast } from 'bootstrap';

    export default {
        mounted() {
            var myToast = new Toast(document.querySelector('#myToast'), {autohide: false});
            var myToast1 = new Toast(document.querySelector('#myToast1'), {autohide: false});
            var myToast2 = new Toast(document.querySelector('#myToast2'), {autohide: false});
            var myToast3 = new Toast(document.querySelector('#myToast3'), {autohide: false});
            myToast.show();  
            myToast1.show();
            myToast2.show();
            myToast3.show();
        },
    }

</script>

<style scoped>
    .toast-body{
        color: var(--text-color);
        font-size: 1rem;
    }
</style>