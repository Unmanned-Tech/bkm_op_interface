<template>
  <div class="row mt-3">
    <div class="col-auto ms-4">
      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad" checked>
        <div class="rad-design"></div>
        <div class="rad-text">Движение из A в B<Base></Base></div>
      </label>

      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">Движение и уборка</div>
      </label>

      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">Уборка области</div>
      </label>
    </div>
    <div class="col">
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

<style scoped>
.rad-label {
  display: flex;
  align-items: center;

  border-radius: 100px;
  padding: 14px 0rem;

  cursor: pointer;
  transition: .3s;
}
.rad-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
}
.rad-design {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 100px;

  background: var(--blue);
  position: relative;
}
.rad-design::before {
  content: '';
  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;

  background: hsl(0, 0%, 90%);
  transform: scale(1.1);
  transition: .3s;
}
.rad-input:checked+.rad-design::before {
  transform: scale(0);
}
.rad-text {
    color: var(--text-color);
    margin-left: 1rem;
    font-size: 1.5rem;
    font-weight: 400;

    transition: .3s;
}
.rad-input:not(:checked)~.rad-text {
  color: hsl(0, 0%, 40%);
}


</style>