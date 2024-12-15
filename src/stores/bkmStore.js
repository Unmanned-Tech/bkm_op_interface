import { defineStore } from 'pinia';

export const useBkmStore = defineStore('bkm', {
  state: () => ({
    selectedBkm: null, // Хранит текущее значение выбора БКМ
  }),
  actions: {
    setBkm(value) {
      this.selectedBkm = value;
    },
  },
});
