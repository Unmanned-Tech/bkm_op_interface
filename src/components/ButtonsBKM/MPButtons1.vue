<template>
    <div class="col">
      <EmerStopButton></EmerStopButton>
    </div>
    <!-- <div class="col">
      <button class="stop clean"><p class="capbtn">Уборка</p></button>
    </div> -->
    <div class="col-3 d-flex justify-content-end">
      <RobotModal1 />
    </div>
</template>

<script>
import RobotModal1 from './RobotModal1.vue'
import EmerStopButton from '../EmerStopButton.vue';
export default {
  components: {
    RobotModal1,
    EmerStopButton,
  },
}

</script>

<style scoped>

  .clean {
    background-color: var(--green);
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    border-radius: 1.125rem;
    color: var(--text-color);
    border: none;
    font: 400 1.25rem "SF Pro Display";
  }
  .capbtn {
    margin: .75rem;
  }

</style>