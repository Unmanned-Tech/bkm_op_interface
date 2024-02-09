<template>
    <div class="col">
        <button class="stop"><p class="capbtn">Остановить</p></button>
    </div>
    <div class="col">
        <button class="stop clean"><p class="capbtn">Уборка</p></button>
    </div>
    <div class="col d-flex justify-content-end">
        <RobotMoreModalVue></RobotMoreModalVue>
    </div>
</template>

<script>
import RobotMoreModalVue from './RobotMoreModal.vue'
export default {
  components: {
    RobotMoreModalVue,
  }
}
</script>

<style scoped>
.stop {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--red);
    border-radius: 1.125rem;
    color: var(--text-color);
    border: none;
    
    font: 400 1.25rem "SF Pro Display";
  }

  .clean {
    background-color: var(--green);
    
  }

  .capbtn {
    margin: .75rem;
  }

</style>