<template>
    <div class="light-controls">
        <button 
            v-for="option in options"
            :key="option.id"
            class="buttonSet"
            :class="{ active: option.state && option.id !== 'mic', mic: option.id === 'mic' }"
            @click="toggleOption(option.id, option.state)"
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
import { computed, watch } from "vue";

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

        const toggleOption = (optionId, state) => {
            store.toggleOption(optionId);
            if (optionId !== "mic" && optionId !== "sound") {
                emit("toggleLight", optionId, state);
            }
        }

        watch(
            () => store.isSmLightsEnabled,
            (newValue) => {
                console.debug("HL изменился", newValue);
            }
        )

        return { options, toggleOption };
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
}
.mic:active {
  border-color: var(--green);
}
.active {
    border-color: var(--green);
}
.optin {
    transform: scale(2);
}
</style>