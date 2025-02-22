<template>
    <div class="info-card">
      <span class="value me-1">{{ value }}</span>
      <span v-if="unit" class="unit">{{ unit }}</span>
      <slot></slot>
    </div>
  </template>
  
<script>
export default {
    props: {
        value: [String, Number],
        unit: String
    }
};
</script>
  
<style scoped>
.info-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--bg-tertiary);
    border-radius: 12px;
    padding: 6px;
    border: solid var(--grey2) 2px;
}
.value {
    font-size: 1.25rem;
    font-weight: bold;
}
.unit {
    font-size: 0.75rem;
    color: var(--grey2);
}
</style>
  