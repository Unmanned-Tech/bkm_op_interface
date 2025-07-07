<template>
  <div class="bms-monitor">
    <h2>Left BMS</h2>
    <div class="cards">
      <div
        v-for="(value, key) in bmsData"
        :key="key"
        class="card"
        :class="getBmsStatusClass(key, value)"
      >
        <p class="label">{{ key }}</p>
        <p class="value" v-html="value" v-if="!isStatusField(key)"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { useRosStore } from "@/stores/ConfigStore";

const rosStore = useRosStore();
const bmsData = ref({
  "Напряжение": '0.00 V',
  "Ток": '0.00 A',
  "SoC": '0 %',
  "Ост. емкость": '0.00 Ah',
  "Темп. мин": '0 &deg;C',
  "Темп. макс": '0 &deg;C',
  "Зарядный мосфет": '',
  "Разрядный мосфет": '',
  "Статус балансировки": '',
  "Мощность": '0 W',
  "Ср. напр. ячейки": '0.00 V',
  "Mакс. дисбаланс": '0.0000 V'
});

let topics = [];

const subscribe = () => {
    if(!rosStore.ros) {
        console.error("no connect to ros");
        return;
    }
    const bmsTopic = new ROSLIB.Topic({
        ros: rosStore.ros,
        name: `/bms_data/id_0003`,
        messageType: "mcu_msgs/msw/BMSData"
    });

    bmsTopic.subscribe((msg) => {
        let temps = msg.temperatures;
        let minTemp = temps.length ? Math.min(...temps) : 0;
        let maxTemp = temps.length ? Math.max(...temps) : 0;
        
        bmsData.value = {
            "Напряжение": `${msg.total_voltage.toFixed(2)} V`,
            "Ток": `${msg.current.toFixed(2)} A`,
            "SoC": `${msg.soc} %`,
            "Ост. емкость": `${msg.remaining_capacity.toFixed(2)} Ah`,
            "Темп. мин": `${minTemp} &deg;C`,
            "Темп. макс": `${maxTemp} &deg;C`,
            "Зарядный мосфет": `${msg.charge_mosfet}`,
            "Разрядный мосфет": `${msg.discharge_mosfet}`,
            "Статус балансировки": msg.balancer_status,
            "Мощность": `${msg.current_power} W`,
            "Ср. напр. ячейки": `${msg.avg_cell_voltage.toFixed(2)} V`,
            "Mакс. дисбаланс": `${(msg.cell_with_highest_voltage - msg.cell_with_lowest_voltage).toFixed(4)} V`,
        };
    });
    topics.push(bmsTopic);
};

onMounted(() => {
    subscribe();
});
onUnmounted(() => {
  topics.forEach(
      (topic) => topic.unsubscribe()
  );
});

const getBmsStatusClass = (key, value) => {
  const colorFields = [
    'Зарядный мосфет', 
    'Разрядный мосфет', 
    'Статус балансировки'
  ];
    
  if (!colorFields.includes(key)) return '';
    
  return value ? 'unlock' : 'lock';
};

const isStatusField = (key) => {
  return [
    'Зарядный мосфет', 
    'Разрядный мосфет', 
    'Статус балансировки'
  ].includes(key);
};

</script>

<style scoped>
p {
  margin: 0;
}
.bms-monitor {
  height: 100%;
  width: 100%;
  padding: 1.5rem;
  background-color: var(--grey6);
  border-radius: 12px;
  text-align: center;
  box-sizing: border-box;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
}

.card {
  background: var(--grey4);
  padding: .5rem .25rem;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  line-height: normal;
  align-items: center;
  display: flex;
  justify-content: center;
}

.label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.value {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
}

.lock {
  background-color: color-mix(in srgb, var(--p-red-950) 30%, transparent);
  color: var(--p-red-500);
  border: 2px solid var(--p-red-900);
  .label {
    margin: 0;
  }
}
.unlock {
  background-color: var(--p-green-950);
  color: var(--p-emerald-400);
  border: 2px solid var(--p-emerald-900);
  .label {
    margin: 0;
  }
}

@media screen and (max-width: 968px) {
  .bms-monitor :deep(.label) {
    font-size: 1.0rem;
  }

  .bms-monitor :deep(.value) {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
