<template>
  <div class="modal fade" id="threeModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="title">Информация</div>
          <table class="tab">
            <tr>
              <td class="time date">{{ localeDate }}</td>
              <td class="time">{{ localeTime }}</td>
            </tr>
          </table>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col">
                <div class="row mb-2">
                  <div class="col-md-2 inf start">
                    <robotSVG></robotSVG>
                  </div>
                  <div class="col d-flex align-items-center inf cap">
                    <div>Робот</div>
                  </div>
                  <div class="col-md-4 inf end d-flex">
                    <div>БКМ-3</div>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-2 inf start">
                    <batterycharged />
                  </div>
                  <div class="col d-flex align-items-center inf cap">
                    <div>Заряд батареи</div>
                  </div>
                  <div class="col-md-3 inf end d-flex">
                    <div class="battery">17%</div>
                  </div>
                </div>
                <div class="row mb-2 mt-5" data-bs-dismiss="modal">
                  <router-link :to="{ name: 'tasks', params: { selectedOption: 'БКМ-3' } }" class="button">
                    <div class="row">
                      <div class="col">Задачи</div>
                      <div class="col svg"><arrowSVG /></div>
                    </div>
                  </router-link>
                </div>
                <div class="row" data-bs-dismiss="modal">
                  <router-link to="/settings" class="button">
                    <div class="row">
                      <div class="col">Сервис</div>
                      <div class="col svg"><arrowSVG /></div>
                    </div>
                  </router-link>
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
                      <tr class="text-primary">
                        <td class="left-cell">Подзарядка</td>
                        <td>Выполняется</td>
                      </tr>
                      <tr>
                        <td class="left-cell last">-</td>
                        <td class="last">-</td>
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
                        <td class="left-cell">П.Камера</td>
                        <td><p class="error mb-0">Загрязнение</p></td>
                      </tr>
                      <tr>
                        <td class="left-cell last">GPS</td>
                        <td class="last"><p class="error error2 mb-0">Потеря сигнала</p></td>
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
  <button id="bkm1" class="other" data-bs-toggle="modal" data-bs-target="#threeModal">
    <otherSVG />
  </button>
</template>

<script>
import arrowSVG from '/src/assets/arrow.svg';
import batterySVG from '/src/assets/battery.svg';
import robotSVG from '/src/assets/android.svg';
import otherSVG from '/src/assets/three-dots.svg';
import batterycharged from '/src/assets/battery-charging.svg'

export default {

  data() {
    return {
      date: 1580558031264,
    }
  },
  
  components: {
    robotSVG,
    batterySVG,
    otherSVG,
    arrowSVG,
    batterycharged,
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
    this.intervalId = setInterval(() => this.date = Date.now(), 1000);
  },

  beforeDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  
  },

}
</script>

<style scoped>
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
  font: 400 1.25rem "SF Pro Display";
  border: .125rem solid var(--grey);
  background-color: var(--bg-tertiary);
  border-top: none;
  padding: .5rem;
}
th {
  font: 700 1.425rem "SF Pro Display";
  padding: .125rem;
  border: .125rem solid var(--grey);
  background-color: var(--grey2);
}
.head {
  border-radius: 0rem 1.125rem 0rem 0rem;
}
th.left-cell {
  border-radius: 1.125rem 0rem 0rem;
}
td.left-cell.last {
  border-radius: 0rem 0rem 0rem 1.125rem;
}
td.last {
  border-radius: 0rem 0rem 1.125rem;
}

.header {
  border-radius: 1.125rem 1.125rem 0rem 0rem;
  padding: .25rem 1.5rem;
  font: 700 1.425rem "SF Pro Display";
  border: .125rem solid var(--grey);
  border-bottom: none;
  text-align: center;
  background-color: var(--bg-tertiary);
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
    font: 400 1.75rem "SF Pro Display";
    padding: .5rem 1.5rem;
    text-decoration: none;
    width: 50%;
  }


  
.modal-content {
  border-radius: 1.125rem; 
}
.inf {
  background-color: var(--bg-tertiary);
  font: 400 1.5rem "SF Pro Display";
  border: solid var(--grey) .125rem;
  text-align: center;
}
.inf.start {
  border-radius: 1.125rem 0rem 0rem 1.125rem;
  border-right: 0;
  padding: .25rem;
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
}
.battery {
  background-color: var(--red);
  padding: .25rem .75rem;
  border-radius: 1.125rem;
}
.error {
  background-color: var(--orange);
  padding: .25rem .1rem;
  border-radius: 1.125rem;
}
.error2 {
  background-color: var(--red);
}
.other {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.5rem;
    border-radius: 1.125rem;
    border: none;
  }

.title {
  font: 400 3rem "SF Pro Display";

}
.time {
  font: 400 2.5rem "SF Pro Display";
  border: .125rem solid var(--grey);
  border-radius: 0rem 1.125rem 1.125rem 0rem;
  padding: .35rem;
}

.time.date {
  border-radius: 1.125rem 0rem 0rem 1.125rem;
  border-right: 0;
}


</style>