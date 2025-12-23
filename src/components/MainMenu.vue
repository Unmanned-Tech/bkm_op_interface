<template>
  <div class="row text-center d-flex mb-1" style="margin-inline: .5px;">
    <div class="col p-0">
      <router-link to="/" class="link h-100">
        Главная
      </router-link>
    </div>
    <div class="col p-0">
      <router-link :to="{ name: 'tasks', params: { selectedOption: store.selectedOption } }" class="link  h-100">
        Задачи
      </router-link>
    </div>
    <div class="col p-0">
      <router-link to="/teleop" class="link h-100">
        Телеуправление
      </router-link>
    </div>
    <div class="col p-0">
      <router-link to="/status" class="link ln h-100">
        Системная <br>информация
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../stores/store';

const store = useStore();

</script>

<style scoped>
  .link {
    box-shadow: 0rem 0.375rem 0.5rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    transition: background-color .3s;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    font-size: 1rem;
    font-weight: 400;
    padding: .5rem;
  }
  .ln {
    padding: .5rem;
    line-height: 1rem;
  }

  @media (max-width: 896px) {
    .link {
      font-size: 1rem;
    }
    .ln {
      font-size: 1rem;
      line-height: .9rem;
    }
  }
</style>

<script>

</script>


