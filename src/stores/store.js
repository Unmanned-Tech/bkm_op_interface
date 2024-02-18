import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
      selectedOption: localStorage.getItem('selectedOption') || null,
  }),
  actions: {
    setSelectedOption(option) {
      this.selectedOption = option;
      localStorage.setItem('selectedOption', option);
      return this.selectedOption;
    },
  },
});

export const useAnotherStore = defineStore('anotherStore', {
  state: () => ({
    anotherSelectedOption: localStorage.getItem('anotherSelectedOption') || null,
  }),
  actions: {
    setAnotherSelectedOption(option) {
      this.anotherSelectedOption = option;
      localStorage.setItem('anotherSelectedOption', option);
      return this.anotherSelectedOption;
    },  
  },
});

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    temperature: null,
    time: null,
    charge: null,
  }),
  actions: {
    setTemperature(temperature) {
      this.temperature = temperature;
    },
    setTime(time) {
      this.time = time;
    },
    setCharge(charge) {
      this.charge = charge;
    },
    setSelOption(option) {
      this.selOption = option;
    }
  }
})