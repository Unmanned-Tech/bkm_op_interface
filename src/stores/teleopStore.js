import { defineStore } from "pinia";

export const useTeleopStore = defineStore("teleop", {
  state: () => ({
    isSmLightsEnabled: JSON.parse(localStorage.getItem('head')) ?? false,
    isStrobeEnabled: JSON.parse(localStorage.getItem('strobeLights')) ?? false,
    isSideEnabled: JSON.parse(localStorage.getItem('sideLights')) ?? false,
    isMicEnabled: JSON.parse(localStorage.getItem('mic')) ?? false,
    isSoundEnabled: JSON.parse(localStorage.getItem('sound')) ?? false,
  }),
  actions: {
    toggleOption(state) {
        switch (state) {
            case "head":
                this.isSmLightsEnabled = !this.isSmLightsEnabled;
                localStorage.setItem('head', JSON.stringify(this.isSmLightsEnabled));
                break;
            case "strobe":
                this.isStrobeEnabled = !this.isStrobeEnabled;
                localStorage.setItem('strobeLights', JSON.stringify(this.isStrobeEnabled));
                break;
            case "side":
                this.isSideEnabled = !this.isSideEnabled;
                localStorage.setItem('sideLights', JSON.stringify(this.isSideEnabled));
                break;
            case "mic":
                this.isMicEnabled = !this.isMicEnabled;
                localStorage.setItem('mic', JSON.stringify(this.isMicEnabled));
                break;
            case "sound":
                this.isSoundEnabled = !this.isSoundEnabled;
                localStorage.setItem('sound', JSON.stringify(this.isSoundEnabled));
                break;
            default:
                break;
        }
    }
  }
});
