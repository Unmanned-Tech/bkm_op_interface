<template>
    <div class="light-controls">
        <button 
            v-for="option in options"
            :key="option.id"
            class="buttonSet"
            :class="{ 
              active: option.state && option.id !== 'mic', 
              mic: option.id === 'mic',
              'mic-active': option.id === 'mic' && option.state
            }"
            @mousedown="startAction(option.id)"
            @mouseup="stopAction(option.id)"
            @touchstart="startAction(option.id)"
            @touchend="stopAction(option.id)"
            @mouseleave="stopAction(option.id)"
        >
            <component :is="option.icon" class="optin"/>
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

        const options = computed(() => [
            { id: "head", icon: Headlight, state: store.isSmLightsEnabled },
            { id: "strobe", icon: Strobe, state: store.isStrobeEnabled },
            { id: "side", icon: SideLights, state: store.isSideEnabled },
            { id: "mic", icon: Mic, state: store.isMicEnabled },
            { id: "sound", icon: Sound, state: store.isSoundEnabled },
        ]);

        // Запуск действия при нажатии
        const startAction = (optionId) => {
            if (optionId === "mic" || optionId === "sound") {
                if (optionId === "mic") {
                    store.setMicEnabled(true);
                } else if (optionId === "sound") {
                    store.setSoundEnabled(true);
                }
                emit("startAction", optionId);
            } else {
                // Для остальных кнопок - обычный toggle
                store.toggleOption(optionId);
                emit("toggleLight", optionId, !options.value.find(opt => opt.id === optionId).state);
            }
        };

        // Остановка действия при отпускании
        const stopAction = (optionId) => {
            if (optionId === "mic" || optionId === "sound") {
                if (optionId === "mic") {
                    store.setMicEnabled(false);
                } else if (optionId === "sound") {
                    store.setSoundEnabled(false);
                }
                emit("stopAction", optionId);
            }
        };

        return { 
            options, 
            startAction, 
            stopAction 
        };
    }  
};
</script>

<style scoped>
.light-controls {
    display: flex;
    gap: 10px;
    padding: 0.5rem;
}
.buttonSet {
    border-radius: 50%;
    padding: 1.5rem;
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
    transform: scale(2);
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