<template>
  <ul class="con mb-1">
    <li class="col">
      <router-link to="/" class="link">Главная</router-link>
    </li>
    <li class="col">
      <router-link :to="{ name: 'tasks', params: { selectedOption: store.selectedOption } }" class="link">Задачи</router-link>
    </li>
    <li class="col">
      <router-link to="/teleop" class="link">Телеуправление</router-link>
    </li>
    <li class="col">
      <router-link to="/status" class="link ln">Системная<br/>информация</router-link>
    </li>
  </ul>
</template>

<script setup>
import { useStore } from '../stores/store';

const store = useStore();

</script>

<style scoped>
  .con {
    display: flex;
    padding: 0;
    list-style-type: none;
    text-align: center;
  }
  .link {
    box-shadow: 0rem 0.375rem 0.5rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    transition: background-color .3s;
    text-decoration: none;
    display: block;
    color: var(--text-color);
    margin: 0;
    width: 100%;
    font-size: 1.25rem;
    line-height: 3.5rem;
    font-weight: 400;
  }
  .ln {
    padding: .5rem;
    line-height: 1.25rem;
  }

  @media (max-width: 896px) {
    .link {
      font-size: 1rem;
      line-height: 2.75rem;
    }
    .ln {
      line-height: .865rem;
    }
  }
</style>

<script>

</script>


