<template>
    <div class="light-controls">
        <button
            v-for="option in clickableOptions"
            :key="option.id"
            class="buttonSet"
            :class="{ 'active': option.state }"
            @click="toggleClickableOption(option.id)"
        >
            <component :is="option.icon" class="optin"/>
        </button>
        
        <button 
            v-if="micOption"
            :key="micOption.id"
            class="buttonSet mic"
            :class="{ 'mic-active': micOption.state }"
            @mousedown="startHoldAction('mic')"
            @mouseup="stopHoldAction('mic')"
            @touchstart="startHoldAction('mic')"
            @touchend="stopHoldAction('mic')"
            @mouseleave="stopHoldAction('mic')"
        >
            <component :is="micOption.icon" class="optin"/>
        </button>

        <button 
            v-if="soundOption"
            :key="soundOption.id"
            class="buttonSet"
            :class="{ 'sound-active': soundOption.state }"
            @mousedown="startHoldAction('sound')"
            @mouseup="stopHoldAction('sound')"
            @touchstart="startHoldAction('sound')"
            @touchend="stopHoldAction('sound')"
            @mouseleave="stopHoldAction('sound')"
        >
            <component :is="soundOption.icon" class="optin"/>
        </button>
    </div>
</template>

<script>
import Headlight from "@/assets/headlights.svg";
import Strobe from "@/assets/strobe.svg";
import SideLights from "@/assets/SideLights.svg";
import Mic from "@/assets/mic-fill.svg";
import Sound from "@/assets/sound.svg";

import { useTeleopStore } from "@/stores/teleopStore2";
import { computed } from "vue";

export default {
    setup(_, { emit }) {
        const store = useTeleopStore();

        const allOptions = computed(() => [
            { id: "head", icon: Headlight, state: store.isSmLightsEnabled, type: "click" },
            { id: "strobe", icon: Strobe, state: store.isStrobeEnabled, type: "click" },
            { id: "side", icon: SideLights, state: store.isSideEnabled, type: "click" },
            { id: "mic", icon: Mic, state: store.isMicEnabled, type: "hold" },
            { id: "sound", icon: Sound, state: store.isSoundEnabled, type: "hold" },
        ]);

        const clickableOptions = computed(() => 
            allOptions.value.filter(opt => opt.type === "click")
        );

        const micOption = computed(() => 
            allOptions.value.find(opt => opt.id === "mic")
        );

        const soundOption = computed(() => 
            allOptions.value.find(opt => opt.id === "sound")
        );

        // Переключение кнопок по клику
        const toggleClickableOption = (optionId) => {
            store.toggleOption(optionId);
            const option = allOptions.value.find(opt => opt.id === optionId);
            emit("toggleLight", optionId, !option.state);
        };

        // Начало удержания для микрофона и звука
        const startHoldAction = (optionId) => {
            if (optionId === "mic") {
                store.setMicEnabled(true);
            } else if (optionId === "sound") {
                store.setSoundEnabled(true);
            }
            emit("startAction", optionId);
        };

        // Окончание удержания для микрофона и звука
        const stopHoldAction = (optionId) => {
            if (optionId === "mic") {
                store.setMicEnabled(false);
            } else if (optionId === "sound") {
                store.setSoundEnabled(false);
            }
            emit("stopAction", optionId);
        };

        
        return { 
            clickableOptions,
            micOption,
            soundOption,
            toggleClickableOption,
            startHoldAction,
            stopHoldAction
        };
    }  
};
</script>

<style scoped>
.light-controls {
    display: flex;
    gap: 8px;
}
.buttonSet {
    border-radius: 50%;
    padding: 1.2rem;
    border: solid var(--grey2) 0.125rem;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
}
.buttonSet:active {
    transform: scale(0.95);
}
.mic {
    border-color: var(--red);
}
.mic-active {
    background-color: var(--red);
    border-color: var(--red);
}
.mic-active .optin {
    filter: brightness(0) invert(1);
}
.sound-active {
    background-color: var(--orange);
    border-color: var(--orange);
}
.sound-active .optin {
    filter: brightness(0) invert(1);
}
.active {
    border-color: var(--green);
}
.optin {
    transform: scale(1.7);
    transition: filter 0.2s ease;
}

/* Стили для активного состояния звука */
.buttonSet:active[class*="sound"] {
    border-color: var(--orange);
    background-color: var(--orange);
}
.buttonSet:active[class*="sound"] .optin {
    filter: brightness(0) invert(1);
}

/* Стили для активного состояния микрофона */
.buttonSet:active[class*="mic"] {
    border-color: var(--red);
    background-color: var(--red);
}
.buttonSet:active[class*="mic"] .optin {
    filter: brightness(0) invert(1);
}
</style>