<template>
    <div class="d-flex justify-content-end">
        <router-link to="/logs" class="set">
            <bellSVG />
        </router-link>
    </div>
</template>

<script>
import bellSVG from '/src/assets/notification-bing.svg';
export default {
    components: {
        bellSVG,
    }
}
</script>

<style scoped>
.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.5rem;
    border-radius: 1.125rem;
    position: absolute;
    border: none;
  }

</style>