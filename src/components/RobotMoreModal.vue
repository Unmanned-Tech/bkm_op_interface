<template>
  <div class="modal fade" id="oneModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="title">Информация</div>
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
                    <div>БКМ - 1</div>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-2 inf start">
                    <batterySVG></batterySVG>
                  </div>
                  <div class="col d-flex align-items-center inf cap">
                    <div>Заряд батареи</div>
                  </div>
                  <div class="col-md-3 inf end d-flex">
                    <div class="battery">79%</div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <table class="tab">
                    <div class="col-md-12 d-flex justify-content-end">
                      <div class="header">Текущие задачи</div>
                    </div>
                    <thead>
                      <tr>
                        <th class="left-cell">Задача</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="text-success">
                        <td class="left-cell">Уборка на тер. 2</td>
                        <td>Выполнена</td>
                      </tr>
                      <tr>
                        <td class="left-cell last">Уборка на тер. N</td>
                        <td class="last">Ожидание</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col">
                <div class="row">
                  <router-link to="/logs">
                    <button class="button" data-bs-dismiss="modal">
                      <div class="row">
                        <div class="col">Задачи</div>
                        <div class="col"><arrowSVG></arrowSVG></div>
                      </div>
                      
                    </button>
                  </router-link>
                </div>
                <div class="row">
                  <router-link to="">
                    <button class="button mt-2" data-bs-dismiss="modal">
                      <div>Сервис</div>
                    </button>
                  </router-link>
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </div>
  <button class="other" data-bs-toggle="modal" data-bs-target="#oneModal">
    <otherSVG />
  </button>
</template>

<script>
import arrowSVG from './SvgComponents/arrowSVG.vue';
import batterySVG from '/src/assets/battery.svg';
import robotSVG from '/src/assets/android.svg';
import otherSVG from '/src/assets/three-dots.svg';
export default {
  components: {
    robotSVG,
    batterySVG,
    arrowSVG,
    otherSVG,
  }
}
</script>

<style scoped>
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
  border-top: none;
  padding: .5rem;
}
th {
  font: 700 1.425rem "SF Pro Display";
  padding: .125rem;
  border: .125rem solid var(--grey);
  background-color: var(--grey2);
}
tbody {
  background-color: var(--bg-tertiary);
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
    padding: .5rem 1.25rem;
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
  background-color: var(--green);
  padding: .25rem .75rem;
  border-radius: 1.125rem;
}
.other {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.5rem;
    border-radius: 1.125rem;
    border: none;
  }

.title {
  font: 400 2.5rem "SF Pro Display";

}

</style>