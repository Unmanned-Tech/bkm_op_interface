<template>
    <div class="col">
      <EmerStopButton></EmerStopButton>
    </div>
    <div class="col d-flex justify-content-end">
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