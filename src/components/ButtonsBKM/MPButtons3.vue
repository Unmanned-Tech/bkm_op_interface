<template>
    <div class="col">
      <EmerStopButton></EmerStopButton>
    </div>
    <div class="col d-flex justify-content-end">
      <RobotModal3 />
    </div>
</template>

<script>
import RobotModal3 from './RobotModal3.vue'
import EmerStopButton from '../EmerStopButton.vue';
export default {
  components: {
    RobotModal3,
    EmerStopButton,
  },
}

</script>