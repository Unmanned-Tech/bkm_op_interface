<template>
    <div class="segmented-control" ref="segmentedControl">
      <!-- Your segmented control options go here -->
      <div class="option" v-for="(option, index) in options" :key="index">
        <input 
            type="radio" 
            :id="'option' + index" 
            name="segmentedControl" 
            :checked="option === store.selectedOption"
            @input="updatePillPosition" 
        />
        <label :for="'option' + index">
            <span>{{ option }}</span>
        </label>
      </div>
      
      <!-- Background pill element -->
      <div class="selection" ref="backgroundPill"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useStore } from '../stores/store';
  import { useRoute, useRouter } from 'vue-router';

  const SEGMENTED_CONTROL_BASE_SELECTOR = ".segmented-control";
  const SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR = ".segmented-control .option input";
  const SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR = ".segmented-control .selection";

  
  const options = ref(["БКМ-1", "БКМ-2", "БКМ-3"]);
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  let segmentedControl;
  let backgroundPill;

  onBeforeUnmount(() => {
    document.body.removeEventListener("input", updatePillPosition);
    window.removeEventListener("resize", updatePillPosition);
  });
  
  onMounted(() => {
    segmentedControl.value = document.querySelector(SEGMENTED_CONTROL_BASE_SELECTOR);
    backgroundPill.value = document.querySelector(SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR);

    const selectedOption = store.selectedOption;
    const selectedIndex = options.value.indexOf(selectedOption);

    if (selectedIndex !== -1) {
        const selectedInput = segmentedControl.value.querySelector(
            SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR + ":checked"
        );
        backgroundPill.value.style.transform = `translateX(${selectedInput.offsetWidth * selectedIndex}px)`;
    }

    const routeSelectedOption = route.params.selectedOption;
    if (options.value.includes(routeSelectedOption)) {
        store.setSelectedOption(routeSelectedOption);
    }
  
    document.body.addEventListener("input", updatePillPosition);
    window.addEventListener("resize", updatePillPosition);
  });
  
  
  function updatePillPosition() {
    const selectedInput = segmentedControl.value.querySelector(SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR + ":checked");
    if (selectedInput) {
        const selectedIndex = Array.from(segmentedControl.value.querySelectorAll(SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR)).indexOf(selectedInput);
        backgroundPill.value.style.transform = `translateX(${selectedInput.offsetWidth * selectedIndex}px)`;

        router.push({ params: { selectedOption: options.value[selectedIndex] } });
        store.setSelectedOption(options.value[selectedIndex]);
    }
    
  }
    
  </script>

<style scoped>
.segmented-control {
    background: var(--bg-tertiary);
    border-radius: 9px;
    margin: 0;
    padding: 3px;
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

.segmented-control .option {
    position: relative;
    cursor: pointer;
}

.segmented-control .option:hover input:not(:checked) + label span, 
.segmented-control .option:active input:not(:checked) + label span, 
.segmented-control .option:focus input:not(:checked) + label span {
    opacity: .2;
}

.segmented-control .option:active input:not(:checked) + label span {
    transform: scale(.95);
}

.segmented-control .option label {
    position: relative;
    display: block;
    text-align: center;
    padding: 3px 6vmin;
    background-color: rgba(255, 255, 255, 0);
    color: var(--text-color);
    font-size: 24px;
    @media (max-width: 896px) {
        font-size: 16px;
    }
}

.segmented-control .option label::before,
.segmented-control .option label::after {
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

.segmented-control .option label::before {
    left: 0;
    transform: translateX(-.5px);
}

.segmented-control .option label::after {
    right: 0;
    transform: translateX(.5px);
}

.segmented-control .option:first-of-type {
    grid-column: 1;
    grid-row: 1;
    box-shadow: none;
}

.segmented-control .option:first-of-type label::before {
    opacity: 0;
}

.segmented-control .option:last-of-type label::after {
    opacity: 0;
}

.segmented-control .option input {
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

.segmented-control .selection {
    background: var(--grey2);
    border: .5px solid rgba(0, 0, 0, .04);
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .12), 0 3px 1px 0 rgba(0, 0, 0, .04);
    border-radius: 9px;
    grid-column: 1;
    grid-row: 1;
    z-index: 2;
    will-change: transform;
    transition: transform .2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.segmented-control .selection label {
    color: var(--text-color);
}

.segmented-control .option label span {
    display: block;
    position: relative;
    z-index: 3;
    transition: all .2s ease;
    will-change: transform;
}

.segmented-control .option input:checked+label span {
    font-family: "SF Pro Bold";
}
.segmented-control .option input:checked+label::before,
.segmented-control .option input:checked+label::after {
    background-color: var(--bg-tertiary);
    z-index: 1;
}

.segmented-control .option input:checked+label {
    cursor: default;
}
</style>
