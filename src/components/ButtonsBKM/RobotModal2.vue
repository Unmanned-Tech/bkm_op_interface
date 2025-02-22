<template>
  <div class="modal fade" id="twoModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="title">Статус робота</div>
          <div class="col d-flex justify-content-end">
            <table class="tab">
              <tr>
                <td class="time date">{{ localeDate }}</td>
                <td class="time">{{ localeTime }}</td>
              </tr>
            </table> 
          </div>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col">
                <div class="row mb-2">
                  <div class="col-md-2 inf start">
                    <robotSVG />
                  </div>
                  <div class="col d-flex align-items-center inf cap">
                    <div>Робот</div>
                  </div>
                  <div class="col-md-4 inf end d-flex">
                    <div>БКМ-2</div>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-2 inf start">
                    <batterySVG />
                  </div>
                  <div class="col d-flex align-items-center inf cap">
                    <div>Заряд батареи</div>
                  </div>
                  <div class="col-md-3 inf end d-flex">
                    <div class="battery_stat" :style="{ backgroundColor: getChargeColor(charge) }">{{ charge }} %</div>
                  </div>
                </div>
                <div class="row mt-5">
                  <button class="button" data-bs-dismiss="modal">
                    <router-link :to="{ name: 'tasks', params: { selectedOption: 'БКМ-2' } }" class="caption">
                        <div class="row align-items-center">
                          <div class="col">
                            Задачи
                          </div>
                          <div class="col ps-0">
                            <arrowSVG />
                          </div>
                        </div>
                    </router-link>
                  </button>
                </div>
                <div class="row mt-2">
                  <button class="button" data-bs-dismiss="modal">
                    <router-link to="/settings" class="caption">
                        <div class="row">
                          <div class="col">
                            Сервис
                          </div>
                          <div class="col ps-0">
                            <arrowSVG />
                          </div>
                        </div>
                    </router-link>
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="d-flex justify-content-end p-0">
                      <div class="header">Текущие задачи</div>
                  </div>
                  <table class="tab">
                    <thead>
                      <tr>
                        <th class="left-cell">Задача</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(task, index) in filteredTasks" :key="index" :style="{ color: getBackgroundColor(task.status) }">
                        <td class="left-cell" :class="{ 'last-cell-left': isLastColumn(index) }" @click="handleEditClick">{{ task.name }}</td>
                        <td :class="{ 'last-cell-right': isLastColumn(index) }" @click="handleEditClick">{{ task.status }}</td>                       
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row mt-2">
                  <table class="tab">
                    <thead>
                      <tr>
                        <th class="left-cell">Датчик</th>
                        <th class="head">Ошибка</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="left-cell last">З.Камера</td>
                        <td class="last">
                          <p class="error mb-0">Загрязнение</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button id="bkm1" class="other" data-bs-toggle="modal" data-bs-target="#twoModal">
    <otherSVG />
  </button>
</template>

<script setup>
import { computed, ref, onMounted, } from 'vue';
import { fetchDataByOption } from '../fetchDataByOption';
import { useRosStore } from "@/stores/ConfigStore";

import arrowSVG from '/src/assets/arrow.svg';
import batterySVG from '/src/assets/battery.svg';
import robotSVG from '/src/assets/android.svg';
import otherSVG from '/src/assets/three-dots.svg';

const charge = ref("-");
const rosStore = useRosStore();
const date = ref(Date.now());

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

const getChargeColor = (charge) => {
  if (charge > 50) {
    return 'var(--green)';
  } else if (charge <= 50 && charge > 20) {
    return 'var(--orange)';
  } else if (charge <= 20) {
    return 'var(--red)';
  }
};

const isLastColumn = (index) => {
  return index === filteredTasks.value.length - 1;
};

const filteredTasks = computed(() => fetchDataByOption('БКМ-2'));

const localeDate = computed(() => {
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(date.value).toLocaleDateString(undefined, dateOptions);
});

const localeTime = computed(() => {
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return new Date(date.value).toLocaleTimeString(undefined, timeOptions);
});

onMounted(() => {
  if (!rosStore.isConnected) {
    rosStore.connect();
  }

  const bmsData = new ROSLIB.Topic({
    ros: rosStore.ros,
    name: "/bms_data",
    messageType: "mcu_msgs/msg/BMSData",
  });

  bmsData.subscribe((msg) => {
    charge.value = msg.soc;
  });

  setInterval(() => date.value = Date.now(), 1000);
});
</script>

<style scoped>
.caption {
  text-decoration: none;
  color: var(--text-color);
  @media (max-width: 896px) {
    font-size: 1rem;
  }
}
.last-cell-left {
  border-bottom-left-radius: 1.125rem;
}
.last-cell-right {
  border-bottom-right-radius: 1.125rem;
}
.svg {
  padding: 0;
}
.col-md-12 {
  padding: 0;
}
.tab {
  border-radius: 1.125rem;
  border-collapse: separate;
  text-align: center;
  padding: 0;
  border-spacing: 0;
}
td {
  font-weight: 400;
  font-size: 1.25rem;
  border: .125rem solid var(--grey);
  background-color: var(--bg-tertiary);
  border-top: none;
  padding: .5rem;
  @media (max-width: 896px) {
    font-size: 14px;
  }
}
th {
  font-family: "SF Pro Bold";
  font-size: 1.425rem;
  padding: .125rem;
  border: .125rem solid var(--grey);
  background-color: var(--grey2);
  @media (max-width: 896px) {
    font-size: 1.125rem;
  }
}
.head {
  border-radius: 0rem 1.125rem 0rem 0rem;
}
th.left-cell {
  border-radius: 1.125rem 0 0;
}
td.left-cell.last {
  border-radius: 0 0 0 1.125rem;
}
td.last {
  border-radius: 0 0 1.125rem 0;
}
.header {
  border-radius: 1.125rem 1.125rem 0rem 0rem;
  padding: .125rem 1.25rem;
  font-family: 'SF Pro Bold';
  font-size: 1.425rem;
  border: .125rem solid var(--grey);
  border-bottom: none;
  text-align: center;
  background-color: var(--bg-tertiary);
  @media (max-width: 896px) {
    font-size: 1.125rem;
  }
}
.left-cell {
  border-right: none;
}
.button {
  box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
  background-color: var(--bg-tertiary);
  border-radius: 1.125rem;
  color: var(--text-color);
  border: none;
  text-align: center;
  font-weight: 400;
  font-size: 1.75rem;
  padding: .5rem 1.25rem;
  text-decoration: none;
  width: auto;
  @media (max-width: 896px) {
    border-radius: .75rem;
  }
}
.modal-content {
  border-radius: 1.125rem; 
}
.inf {
  background-color: var(--bg-tertiary);
  font-weight: 400;
  font-size: 1.5rem;
  border: solid var(--grey) .125rem;
  text-align: center;
  @media (max-width: 896px) {
    font-size: 14px;
  }
}
.inf.start {
  border-radius: 1.125rem 0rem 0rem 1.125rem;
  border-right: 0;
  padding: .25rem;
  @media (max-width: 896px) {
    border-radius: .75rem 0 0 .75rem;
  }
}
.inf.cap {
  border-left: 0;
  border-radius: 0;
  border-right: 0;
}
.inf.end {
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border-radius: 0rem 1.125rem 1.125rem 0rem;
  @media (max-width: 896px) {
    border-radius: 0 .75rem .75rem 0;
  }
}
.battery_stat {
  /* background-color: var(--orange); */
  padding: .125rem .5rem;
  border-radius: 1.125rem;
}
.error {
  background-color: var(--orange);
  padding: .25rem .1rem;
  border-radius: 1.125rem;
}
.other {
  box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
  background-color: var(--bg-tertiary);
  padding: 0.5rem;
  border-radius: 1.125rem;
  border: none;
  @media (max-width: 896px) {
    padding: .3rem;
    border-radius: .75rem;
  }
}

.title {
  font-weight: 400;
  font-size: 2.5rem;
  @media (max-width: 896px) {
    font-size: 1.5rem;
  }
}
.time {
  font-weight: 400;
  font-size: 2rem;
  font-family: "SF Pro";
  border: .125rem solid var(--grey);
  border-radius: 0rem 1.125rem 1.125rem 0rem;
  padding: 0 .35rem;
  @media (max-width: 896px) {
    font-size: 1.25rem;
    border-radius: 0 .75rem .75rem 0;
  }
}

.time.date {
  border-radius: 1.125rem 0rem 0rem 1.125rem;
  border-right: 0;
  @media (max-width: 896px) {
    border-radius: .75rem 0 0 .75rem;
  }
}


</style>