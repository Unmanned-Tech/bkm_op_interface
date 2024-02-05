<template>
  <ul class="con">
    <li class="column">
      <router-link to="/" class="link">Главная</router-link>
    </li>
    <li class="column">
      <router-link to="/logs" class="link">Задачи</router-link>
    </li>
    <li class="column">
      <router-link to="/teleop" class="link">Телеуправление</router-link>
    </li>
    <li class="column">
      <router-link to="/status" class="link div-6">Системная информация</router-link>
    </li>
  </ul>
</template>

<style scoped>
  .con {
    display: flex;
    width: 100%;
    padding: 0;
    font-family: 'SF Pro Text';
    list-style-type: none;
  }

  .column {
    box-sizing: border-box;
    width: 25%;
  }

  .link {
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, .25);
    background-color: var(--SystemBG-Dark-Elevated-Tertiary);
    text-decoration: none;
    color: inherit;
    display: block;
    color: white;
    text-align: center;
    margin: 0;
    width: 100%;
    font: 400 36px/100px "SF Pro Text";
  }
</style>

<script>

</script>


