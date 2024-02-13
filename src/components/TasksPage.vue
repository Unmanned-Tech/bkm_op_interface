<template>
    <div>
        <div class="row mt-4 mb-2 align-items-center header">
            <div class="col-md-3 mb-4">
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
            <div class="col-md-3 mb-4 d-flex justify-content-center">
                <button class="set">
                    <plusSVG />
                </button>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col d-flex">
                <table class="tab">
                    <tr>
                        <th class="thead start">Задача</th>
                        <th class="thead mid">Время</th>
                        <th class="thead mid">Статус</th>
                        <th class="thead mid">Заряд</th>
                        <th class="thead end"></th>
                    </tr>
                    <tr class="text-primary">
                        <td>Задача 1</td>
                        <td class="mid">10:00</td>
                        <td class="mid">Выполняется</td>
                        <td class="mid">80%</td>
                        <td class="mid d-flex"><editTask /></td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td class="mid">-</td>
                        <td class="mid">-</td>
                        <td class="mid">-</td>
                        <td class="mid d-flex"><editTask /></td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td class="mid">-</td>
                        <td class="mid">-</td>
                        <td class="mid">-</td>
                        <td class="mid d-flex"><editTask /></td>
                    </tr>
                    <tr>
                        <td class="first">-</td>
                        <td class="mid">-</td>
                        <td class="mid">-</td>
                        <td class="mid">-</td>
                        <td class="mid d-flex last"><editTask /></td>
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
        <div class="row mt-4">
            <div class="col d-flex justify-content-end">
                <button class="set add">Добавить</button>
            </div>

        </div>

    </div>
    

</template>

<script>
import SegmentedControl from './SegmentedControl.vue';
import plusSVG from '/src/assets/plus.svg';
import otherSVG from '/src/assets/three-dots.svg';
import editTask from './editTask.vue';

export default {
    components: {
    SegmentedControl,
    plusSVG,
    otherSVG,
    editTask
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
  }
}

</script>

<style scoped>
.header{
    border-bottom: solid .125rem var(--bg-tertiary);
}
.tab {
  border-radius: 1.125rem;
  border-collapse: separate;
  text-align: center;
  border-spacing: 0;
  background-color: var(--bg-tertiary);
}
td {
  font: 400 1.5rem "SF Pro Display";
  border: .125rem solid var(--grey);
  background-color: var(--bg-tertiary);
  padding: .5rem;
  border-top: none;
}

.thead {
    font: 700 1.75rem "SF Pro Display";
    padding: .5rem 1.25rem;
    border: .125rem solid var(--grey);
    background-color: var(--grey2);
}
.tasks {
    padding: .5rem 1rem;
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
.first {
    border-radius: 0 0 0 1.125rem;
}
.last {
    border-radius: 0 0 1.125rem;
}
.lastcell {
    border-radius: 0 0 1.125rem 1.125rem;
}
.time {
  font: 400 2rem "SF Pro Display";
  border: .125rem solid var(--grey);
  border-radius: 0 1.125rem 1.125rem 0;
  padding: .35rem;
}
.time.date {
  border-radius: 1.125rem 0 0 1.125rem;
  border-right: 0;
}

.set {
    box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: .75rem;
    border-radius: 1.125rem;
    border: none;
    font: 400 2rem "SF Pro Display";
    color: var(--text-color);
}
.add {
    padding: .75rem 1.5rem;
}



</style>