<template>
    <div class="io-segmented-control">
      <!-- Ваши опции для сегментированного контрола -->
      <div class="option" v-for="(option, index) in options" :key="index">
        <input 
          type="radio" 
          :id="'option' + index + '_threeComponent'" 
          name="segmentedForTask" 
          :checked="option === threeStore.threeSelectedOption"
          @input="updatePillPosition" 
        />
        <label :for="'option' + index + '_threeComponent'">
          <span>{{ option }}</span>
        </label>
      </div>
      
      <!-- Элемент заднего плана (ползунок) -->
      <div class="selection" ref="backgroundPill_1"></div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useThreeStore } from '../../stores/store';
    import { useRoute, useRouter } from 'vue-router';
  
    const SEGMENTED_CONTROL_BASE_SELECTOR_1 = ".io-segmented-control";
    const SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR_1 = ".io-segmented-control .option input";
    const SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR_1 = ".io-segmented-control .selection";


    const threeStore = useThreeStore();
    const route = useRoute();
    const router = useRouter();
    
    const options = ref(["БКМ-1", "БКМ-2", "БКМ-3", "Все"])
    
    const segmented = ref(null);
    const backgroundPill_1 = ref(null);
    
    
    onMounted(() => {
        segmented.value = document.querySelector(SEGMENTED_CONTROL_BASE_SELECTOR_1);
        backgroundPill_1.value = document.querySelector(SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR_1);

        const threeSelectedOption = threeStore.threeSelectedOption;
        const selectedIndex = options.value.indexOf(threeSelectedOption);

        if (selectedIndex !== -1) {
            const selectedInput = segmented.value.querySelector(
                SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR_1 + ":checked"
            );
            backgroundPill_1.value.style.transform = `translateX(${selectedInput.offsetWidth * selectedIndex}px)`;
        }

        const routeSelectedOption = route.params.threeSelectedOption;
        if (options.value.includes(routeSelectedOption)) {
            store.setSelectedOption(routeSelectedOption);
        }

        document.body.addEventListener("input", updatePillPosition);
        window.addEventListener("resize", updatePillPosition);
    });
    
    onBeforeUnmount(() => {
        document.body.removeEventListener("input", updatePillPosition);
        window.removeEventListener("resize", updatePillPosition);
    });
    
    function updatePillPosition() {
        const selectedInput = segmented.value.querySelector(SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR_1 + ":checked");
        if (selectedInput) {
            const selectedIndex = Array.from(segmented.value.querySelectorAll(SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR_1)).indexOf(selectedInput);
            backgroundPill_1.value.style.transform = `translateX(${selectedInput.offsetWidth * selectedIndex}px)`;

            router.push({ params: { selectedOption: options.value[selectedIndex] } });
            threeStore.setThreeSelectedOption(options.value[selectedIndex]);
        }
    };


</script>

<style scoped>
.io-segmented-control {
    background: var(--bg-tertiary);
    border-radius: 12px;
    padding: 5px 3px;
    border: none;
    outline: none;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.io-segmented-control .option {
    position: relative;
    cursor: pointer;
}

.io-segmented-control .option:hover input:not(:checked) + label span, 
.io-segmented-control .option:active input:not(:checked) + label span, 
.io-segmented-control .option:focus input:not(:checked) + label span {
    opacity: .2;
}

.io-segmented-control .option:active input:not(:checked) + label span {
    transform: scale(.95);
}

.io-segmented-control .option label {
    position: relative;
    display: block;
    text-align: center;
    padding: 1px 4vmin;
    background-color: rgba(255, 255, 255, 0);
    color: var(--text-color);
    font-size: 24px;
    @media (max-width: 896px) {
        font-size: 16px;
    }
}

.io-segmented-control .option label::before,
.io-segmented-control .option label::after {
    content: '';
    width: 1px;
    background: rgba(198, 198, 200, .3);
    opacity: .3;
    position: absolute;
    top: 25%;
    bottom: 25%;
    border-radius: 10px;
    will-change: background;
    transition: background .2s ease;
}

.io-segmented-control .option label::before {
    left: 0;
    transform: translateX(-.5px);
}

.io-segmented-control .option label::after {
    right: 0;
    transform: translateX(.5px);
}

.io-segmented-control .option:first-of-type {
    grid-column: 1;
    grid-row: 1;
    box-shadow: none;
}

.io-segmented-control .option:first-of-type label::before {
    opacity: 0;
}

.io-segmented-control .option:last-of-type label::after {
    opacity: 0;
}

.io-segmented-control .option input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: 0;
    outline: 0;
    border: 0;
    opacity: 1;
}

.io-segmented-control .selection {
    background: var(--grey2);
    border: .5px solid rgba(0, 0, 0, .04);
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .12), 0 3px 1px 0 rgba(0, 0, 0, .04);
    border-radius: 12px;
    grid-column: 1;
    grid-row: 1;
    z-index: 2;
    will-change: transform;
    transition: transform .2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.io-segmented-control .selection label {
    color: var(--text-color);
    font-size: 20px;
}

.io-segmented-control .option label span {
    display: block;
    position: relative;
    z-index: 3;
    transition: all .2s ease;
    will-change: transform;
}

.io-segmented-control .option input:checked+label span {
    font-family: "SF Pro Bold";
}
.io-segmented-control .option input:checked+label::before,
.io-segmented-control .option input:checked+label::after {
    background-color: var(--bg-tertiary);
    z-index: 1;
}

/* .io-segmented-control .option input:checked+label {
    cursor: default;
} */
</style>
