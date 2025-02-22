import { defineStore } from 'pinia';

export const useBkmStore = defineStore('bkm', {
  state: () => ({
    selectedBkm: localStorage.getItem('selectedBkm') || 'БКМ-2', // Хранит текущее значение выбора БКМ
  }),
  actions: {
    setBkm(value) {
      this.selectedBkm = value;
      localStorage.setItem('selectedBkm', value);
    },
  },
});
