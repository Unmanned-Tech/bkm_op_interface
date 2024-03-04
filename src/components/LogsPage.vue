<template>
  <div>
    <div class="row mt-4 mb-2 align-items-center header">
      <div class="col-7">
        <segmentedForStatus></segmentedForStatus>
      </div>
      <div class="row mt-3">
        <div class="col-8">
          <table class="tab">
            <tr>
              <th class="thead start">Датчик</th>
              <th class="thead status">Статус</th>
              <th class="thead end">Ошибки</th>
            </tr>
            <tr>
              <td class="Start">LiDAR</td>
              <td class="Mid">
                <span class="statusBg">Исправен</span>
              </td>
              <td class="End error"> - </td>
            </tr>
            <tr>
              <td class="Start">GPS</td>
              <td class="Mid">
                <span class="statusBg">Исправен</span>
              </td>
              <td class="End error"> - </td>
            </tr>
            <tr>
              <td class="Start">IMU</td>
              <td class="Mid">
                <span class="statusBg">Исправен</span>
              </td>
              <td class="End error"> - </td>
            </tr>
            <tr>
              <td class="Start">П.Камера</td>
              <td class="Mid">
                <span class="statusBgWarn">Неполадка</span>
              </td>
              <td class="End position-relative error"> <span> Снижение видимости из-за загрязнения</span> 
                <div class="position-absolute">
                  <button class="other">
                    <otherSVG />
                  </button>
                </div> </td>
            </tr>
            <tr>
              <td class="last-cell-left">З.Камера</td>
              <td class="Mid">
                <span class="statusBgError">Ошибка</span>
              </td>
              <td class="last-cell-right error"> Потеря сигнала </td>
            </tr>
            
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import segmentedForStatus from "./ButtonsBKM/segmentedForStatus.vue";
import otherSVG from '/src/assets/three-dots.svg';

export default {
  components:{
    segmentedForStatus,
    otherSVG,
  },
  
  name: "logs"
} 
</script>

<style scoped>
.last-cell-left {
  border-bottom-left-radius: 1.125rem;
}
.last-cell-right {
  border-bottom-right-radius: 1.125rem;
}

.tab {
  border-radius: 1.125rem;
  border-collapse: separate;
  text-align: center;
  border-spacing: 0;
}
td {
  font-size: 1.25rem;
  font-family: "SF Pro";
  border: .125rem solid var(--grey);
  background-color: var(--bg-tertiary);
  padding: .5rem;
  border-top: none;
}

.thead {
    font-size: 1.5rem;
    font-family: "SF Pro Bold";
    padding: .5rem 1.25rem;
    border: .125rem solid var(--grey);
    background-color: var(--grey2);
}
.thead.start {
  padding: .5rem 2.5rem ;
}
.thead.status {
  padding: .5rem 3rem;
}
.thead.end {
  padding: .5rem 7rem ;
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
.lastcell {
  border-radius: 0 0 1.125rem 1.125rem;
}
.error{
  text-align: left;
}
.statusBg {
  background-color: var(--green);
  padding: .25rem 1rem;
  border-radius: 1.125rem;
}
.statusBgError {
  background-color: var(--red);
  padding: .25rem 1rem;
  border-radius: 1.125rem;
}
.statusBgWarn {
  background-color: var(--orange);
  padding: .25rem 1rem;
  border-radius: 1.125rem;
}
.other {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--grey2);
    padding: .5rem;
    border-radius: 1.125rem;
    border: none;
    margin: 0rem 1rem;
}
</style>