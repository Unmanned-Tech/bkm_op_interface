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