<template>
    <div class="slider">
        <label :for="id" class="form-label">
            <div class="row">
                <span class="col caption_low pe-1">{{ label }}</span>
                <span v-if="showValue" class="col-auto caption_low_num d-flex justify-content-end" :style="colorStyle">
                    {{ sliderValue }} {{ unit }}
                </span>
            </div>
        </label>

        <div class="range-container">
            <div v-if="showLetters" class="letter left">L</div>

            <input 
                v-model="sliderValue" 
                type="range" 
                class="form-range" 
                :min="min" 
                :max="max" 
                :step="step" 
                :id="id"
                @input="updateValue" 
            />
            
            <div v-if="showLetters" class="letter right">R</div>
        </div>
        
    </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";

export default {
    props: {
        id: String,
        label: String,
        min: Number,
        max: Number,
        step: Number,
        unit: String,
        modelValue: Number,
        colorStyle: Object,
        showLetters: Boolean,
        showValue: Boolean,
    },
    setup(props, { emit }) {
        const sliderValue = ref(props.modelValue);
        const colorStyle = ref(props.colorStyle);

        // Загружаем сохранённое значение при монтировании
        onMounted(() => {
            const savedValue = localStorage.getItem(props.id);
            if (savedValue !== null) {
                sliderValue.value = Number(savedValue);
                emit("update:modelValue", sliderValue.value);
            }
        });

        watch(() => props.modelValue, (newVal) => {
            sliderValue.value = newVal;
        });

        const updateValue = () => {
            emit("update:modelValue", parseInt(sliderValue.value));
            localStorage.setItem(props.id, sliderValue.value);
        };

        return { sliderValue, updateValue, colorStyle };
    }
};
</script>

<style scoped>
.slider {
    margin-bottom: -0.5rem;
}
.range-container {
    position: relative;
}
.letter {
  position: absolute;
  z-index: 1;
  top: 0.4rem;
  width: 0.75rem;
  text-align: center;
  font-weight: 700;
  font-family: "SF Pro Bold";
  color: var(--text-color);
  user-select: none;
  pointer-events: none;
}
.left {
  left: 0.5rem;
}
.right {
  right: 0.5rem;
}
.form-label {
  display: inline;
}
.caption_low {
  font-size: 1.15rem;
}
.caption_low_num {
  min-width: 120px;
  font-size: 1.15rem;
}

@media (max-width: 896px) {
    .letter {
        top: 0.25rem;
        width: 0.75rem;
        font-weight: 700;
        font-size: 0.8rem;
    }
    .caption_low {
        font-size: 1.5cqmax;
    }
    .caption_low_num {
        font-size: 1rem;
    }
}
</style>
