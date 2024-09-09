<template>
  <div class="row mt-3">
    <div class="col map_col">
      <Map />
    </div>
  </div>
</template>

<script>
import Map from '../maps/MapTask.vue';

export default {
    components: {
        Map
    }
}
</script>