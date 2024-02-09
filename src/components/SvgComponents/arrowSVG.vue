<template>
    <div v-html="currentSVG"></div>
</template>

<script>
export default {
  data: function() {
    return {
      svgPath: '/src/assets/arrow.svg',
      currentSVG: '',
    }
  },
  mounted: function() {
    this.loadSVG();
  },
  methods: {
    loadSVG() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this.svgPath, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this.currentSVG = xhr.responseText;
                }
            };
            xhr.send();
        },
  }
}
</script>

<style scoped>

</style>