<template>
  <div>
    <div class="row mt-3">
      <div class="col d-flex mt-auto mb-auto">
        <button class="button" @click="goBack">
          <div
            class="col svg me-1 d-flex align-items-center justify-content-center"
          >
            <arrowSVG />
          </div>
          <div class="col p-0 me-3">Назад</div>
        </button>
      </div>
      <div class="col text-center d-flex align-items-center">
        <div class="header">Редактор задач</div>
      </div>
      <div class="col-auto justify-content-center me-5">
        <div class="row">
          <button class="button">
            <div class="px-3 py-1 ln">Сохранить как шаблон</div>
          </button>
        </div>
        <div class="row mt-2">
          <button class="button">
            <div class="px-3 py-1 ln">Сохранить и активировать</div>
          </button>
        </div>
      </div>
    </div>
    <div class="row line mb-3 mb-lg-4 mt-3 mt-lg-4"></div>
    <div class="row">
      <div class="col-3">
        <div class="form__group">
          <input
            type="input"
            class="form-field"
            id="nameTask"
            name="nameTask"
            placeholder="Название задачи"
            required
          />
          <label for="nameTask" class="form__label">Название задачи</label>
        </div>
      </div>
      <div class="col-4 mb-auto d-flex justify-content-end">
        <select class="form__select">
          <option disabled selected>Робот</option>
          <option value="БКМ-1">БКМ-1</option>
          <option value="БКМ-2">БКМ-2</option>
          <option value="БКМ-3">БКМ-3</option>
        </select>
      </div>
      <div class="col">
        <segmented />
      </div>
    </div>
    <div>
      <settingsEditTask v-if="anotherSelectedOption === 'Настройки'" />
      <mapEditTask v-if="anotherSelectedOption === 'Карта'" />
    </div>
  </div>
</template>

<script setup>
import { useAnotherStore } from "../stores/store";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "../stores/store";

const store = useStore();
const anotherStore = useAnotherStore();
const router = useRouter();

const anotherSelectedOption = computed(
  () => anotherStore.anotherSelectedOption
);

function goBack() {
  router.push({
    name: "tasks",
    params: { selectedOption: store.selectedOption },
  });
}
</script>

<script>
import mapEditTask from "./ButtonsBKM/mapEditTask.vue";
import arrowSVG from "/src/assets/arrow.svg";
import segmented from "./ButtonsBKM/segmented.vue";
import settingsEditTask from "./ButtonsBKM/settingsEditTask.vue";

export default {
  components: {
    arrowSVG,
    segmented,
    settingsEditTask,
    mapEditTask,
  },
};
</script>

<style scoped>
.ln {
  padding: 0.5rem;
  line-height: 1.5rem;
}
.form__select {
  font-weight: 400;
  font-size: 1.75rem;
  border: 0;
  padding: 0.5rem 2.5rem;
  text-align: center;
  color: var(--text-color);
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem;
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  @media (max-width: 896px) {
    font-size: 1.25rem;
    border-radius: 0.75rem;
  }
}
select:focus,
select:active,
option:active,
option:focus {
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  outline: none;
}

option {
  font-size: 1.125rem;
}
option:checked {
  font-weight: 700;
}
.form__group {
  position: relative;
  padding: 1rem 0 0;
  width: 100%;
}
.form-field {
  font-weight: 400;
  font-size: 1.5rem;
  border: 0;
  border-bottom: 2px solid var(--grey2);
  outline: 0;
  color: var(--text-color);
  padding: 2px 0;
  background: transparent;
  transition: border-color 0.2s;
  caret-color: var(--blue);
  @media (max-width: 896px) {
    font-size: 1rem;
  }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-family: "SF Pro";
    font-size: 1.5rem;
    cursor: text;
    top: 1.125rem;
    @media (max-width: 896px) {
      font-size: 1.1rem;
      top: 1rem;
    }
  }
}
.form__label {
  font-family: "SF Pro";
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: var(--grey);
}
.line {
  border-top: solid 0.125rem var(--bg-tertiary);
}
.header {
  font-weight: 400;
  font-size: 1.75rem;
  font-family: "SF Pro";
  border-radius: 1.125rem;
  padding: 0.25rem 1.5rem;
  @media (max-width: 896px) {
    font-size: 1.25rem;
    border-radius: 0.75rem;
  }
}
.svg {
  padding: 0;
  transform: rotate(180deg) scale(0.8);
}
.button {
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem;
  color: var(--text-color);
  border: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  @media (max-width: 896px) {
    font-size: 1.25rem;
    padding: 5px 10px;
    border-radius: 0.75rem;
  }
}
</style>
