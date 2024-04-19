<template>
    <div>
        <div class="row mt-4 mb-2 align-items-center header">
            <div class="col col-lg-3 mb-4">
                <table class="tab">
                    <tr>
                        <td class="time date">{{ localeDate }}</td>
                        <td class="time">{{ localeTime }}</td>
                    </tr>
                </table>
            </div>
            <div class="col mb-4">
                <SegmentedControl />
            </div>
            <div class="col-2 col-lg-3 mb-4 d-flex justify-content-end">
              <router-link :to="{ name: 'edit', params: { mode: 'Настройки' } }">
                <button class="set">
                    <plusSVG />
                </button>
              </router-link>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <table class="tab">
                    <tr>
                        <th class="thead start">Задача</th>
                        <th class="thead mid">Время</th>
                        <th class="thead mid status">Статус</th>
                        <th class="thead mid">Заряд</th>
                        <th class="thead end"></th>
                    </tr>
                    <tr v-for="(task, index) in filteredTasks" :key="index" :style="{ color: getBackgroundColor(task.status) }">
                        <td :class="{ 'last-cell-left': isLastColumn(index) }" @click="handleEditClick">{{ task.name }}</td>
                        <td class="mid">{{ task.time }}</td>
                        <td class="mid">{{ task.status }}</td>
                        <td class="mid">{{ task.charge }}</td>
                        <td class="mid edd" :class="{ 'last-cell-right': isLastColumn(index) }" @click="handleEditClick"><editTask /></td>
                    </tr>
                </table>
            </div>
            <div class="col d-flex justify-content-end">
                <table class="tab">
                    <tr>
                        <th class="thead tasks">Сохраненные задачи</th>
                    </tr>
                    <tr><td>Задача 2</td></tr>
                    <tr><td>-</td></tr>
                    <tr><td>-</td></tr>
                    <tr><td>-</td></tr>
                    <tr><td>-</td></tr>
                    <tr><td class="lastcell">-</td></tr>
                </table>
            </div>
        </div>
        <!-- <div class="row mt-4">
            <div class="col d-flex justify-content-end">
                <button class="set add">Добавить</button>
            </div>
        </div> -->

    </div>
    

</template>

<script setup>
import { computed, ref } from 'vue';
import { fetchDataByOption } from './fetchDataByOption';
import { useStore } from '../stores/store';

const store = useStore();

const isLastColumn = ref((index) => {
  return index === filteredTasks.value.length - 1;
});

const getBackgroundColor = (status) => {
  switch (status) {
    case 'Выполнена':
      return 'var(--green)';
    case 'Выполняется':
      return 'var(--blue)';
    default:
      return 'var(--text-color)';
  }
};

const filteredTasks = computed(() => fetchDataByOption(store.selectedOption));

</script>

<script>
import SegmentedControl from './SegmentedControl.vue';
import plusSVG from '/src/assets/plus.svg';
import otherSVG from '/src/assets/three-dots.svg';
import editTask from './editTask.vue';
import EditorTasks from './EditorTasks.vue';

export default {
    components: {
    SegmentedControl,
    plusSVG,
    otherSVG,
    editTask,
    EditorTasks,
},
    data() {
        return {
            date: 1580558031264,
        }
    },
    computed: {
    localeDate() {
      const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      
      const dateString = new Date(this.date).toLocaleDateString(undefined, dateOptions);
      
      return dateString
    },
    localeTime() {
      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      };
      const timeString = new Date(this.date).toLocaleTimeString(undefined, timeOptions);
      return timeString
    },
  },
  created() {
    this.updateTime();
    this.intervalId = setInterval(() => this.date = Date.now(), 1000);
  },

  beforeDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  
  },
  methods: {
    updateTime() {
      this.date = Date.now();
    },
  },
}

</script>

<style scoped>
.last-cell-left {
  border-bottom-left-radius: 1.125rem;
}
.last-cell-right {
  border-bottom-right-radius: 1.125rem;
}
.edd {
  padding: 8px 
}
.header{
  border-bottom: solid .125rem var(--bg-tertiary);
}
.tab {
  border-radius: 1.125rem;
  border-collapse: separate;
  text-align: center;
  border-spacing: 0;
}
td {
  font-weight: 400;
  font-size: 1.5rem;
  border: .125rem solid var(--grey);
  background-color: var(--bg-tertiary);
  padding: .5rem;
  border-top: none;
  @media (max-width: 896px) {
    font-size: 14px;
    padding: 2px;
  }
}

.last-cell-left {
  border-bottom-left-radius: 1.125rem;
}
.last-cell-right {
  border-bottom-right-radius: 1.125rem;
}

.thead {
  font-weight: 700;
  font-family: 'SF Pro Bold';
  font-size: 1.75rem;
  padding: .5rem 1.25rem;
  border: .125rem solid var(--grey);
  background-color: var(--grey2);
  @media (max-width: 896px) {
    font-size: 16px;
    padding: 0px 10px;
  }
}
.thead.start {
  padding: .5rem 3.5rem ;
  @media (max-width: 896px) {
    padding: 0px 2rem;
  }
}
.thead.status {
  padding: .5rem 3rem;
}
.tasks {
  padding: .5rem 1.5rem;
  border-radius: 1.125rem 1.125rem 0 0;
}

.start {
  border-radius: 1.125rem 0 0;
}
.mid {
  border-left: none;
}
.end {
  border-radius: 0 1.125rem 0 0;
  border-left: none;
}
.lastcell {
  border-radius: 0 0 1.125rem 1.125rem;
}
.time {
  font-weight: 400;
  font-size: 1.5rem;
  border: .125rem solid var(--grey);
  border-radius: 0 1.125rem 1.125rem 0;
  padding: .25rem .85rem;
  @media (max-width: 896px) {
    font-size: 1.25rem;
    border-radius: 0 .75rem .75rem 0;
  } 
}
.time.date {
  border-radius: .75rem 0 0 .75rem;
  border-right: 0;
}
.set {
  box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
  background-color: var(--bg-tertiary);
  padding: .661rem .75rem;
  border-radius: 1.125rem;
  border: none;
  font-weight: 400;
  font-size: 2rem;
  color: var(--text-color);
  @media (max-width: 896px) {
    padding: 2px;
  }
}
/* .add {
  padding: .75rem 1.5rem;
  @media (max-width: 896px) {
    padding: 8px 16px;
    font-size: 1rem;
  }
} */
</style>