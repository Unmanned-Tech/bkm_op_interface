<template>
    <div class="col">
      <EmerStopButton></EmerStopButton>
    </div>
    <div class="col d-flex justify-content-end">
      <RobotModal2 />
    </div>
</template>

<script>
import RobotModal2 from './RobotModal2.vue'
import EmerStopButton from '../EmerStopButton.vue';
export default {
  components: {
    RobotModal2,
    EmerStopButton,
  },
}

</script>