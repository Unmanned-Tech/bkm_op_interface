<template>
    <div class="d-flex mb-2 justify-content-end me-2">
        <div class="btn-group dropstart">
            <button class="set" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                <settingsSVG />
            </button>
            <div class="dropdown-menu animate fade">
                <div class="dropdown-header">
                    <div class="row mb-1 align-items-center">
                        <div class="col-auto">
                            <div class="caption">Настройки камеры</div>
                        </div>
                        <div class="col d-flex justify-content-end">
                            <button class="reset" @click="reset">
                                <resetSVG />
                            </button>
                        </div>
                    </div>
                    <div class="mb-2">Режим экспозиции (по умолчанию: Auto):</div>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <button class="tongue" :class="{ active: exposureMode === 0 }" @click="sendExposure(0)">
                                Auto
                            </button>
                        </div>
                        <div class="col-auto">
                            <button class="tongue" :class="{ active: exposureMode === 2 }" @click="sendExposure(2)">
                                Manual
                            </button>
                        </div>
                    </div>
                    <div class="brightness">
                        <div class="mt-2">Яркость (по умолчанию: 0): <span>{{ brightness }}</span></div>
                        <input type="range" 
                               class="form-range" 
                               min="-64" 
                               max="64" 
                               v-model="brightness"
                               step="1" 
                               id="brightness"
                               @change="sendBrightness"
                        />
                    </div>
                    <div class="contrast">
                        <div class="mt-2">Контраст (по умолчанию: 50): <span>{{ contrast }}</span></div>
                        <input type="range" 
                               class="form-range" 
                               min="0" 
                               max="100" 
                               v-model="contrast" 
                               step="1" 
                               id="contrast"
                               @change="sendContrast"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import settingsSVG from '/src/assets/settings.svg';
import axios from 'axios';
import resetSVG from '/src/assets/arrow-repeat.svg';

export default {
    components: {
        settingsSVG,
        resetSVG,
    },
    data: function() {
        return {
            brightness: 0,
            contrast: 50,
            exposureMode: 0,
        }
    },

    mounted: function() {
        if (localStorage.getItem('brightness')) {
            this.brightness = parseInt(localStorage.getItem('brightness'));
        }
        if (localStorage.getItem('contrast')) {
            this.contrast = parseInt(localStorage.getItem('contrast'));
        }
        this.sendExposure(0);
    },

    methods: {
        async sendExposure(mode) {
            try {
                const response = await axios.post('http://192.168.1.1:5000/send_command', {
                    command: `v4l2-ctl -d /dev/video0 --set-ctrl=auto_exposure=${mode}`
                });
                console.log(response.data);
                this.exposureMode = mode;
            } catch (error) {
                console.error(error);
            }
        },
        async sendBrightness() {
            try {
                const response = await axios.post('http://192.168.1.1:5000/send_command', {
                    command: `v4l2-ctl -d /dev/video0 --set-ctrl brightness=${ this.brightness }`
                });
                console.log(response.data);
                localStorage.setItem('brightness', this.brightness);
            } catch (error) {
                console.error(error)
            }
        },
        async sendContrast() {
            try {
                const response = await axios.post('http://192.168.1.1:5000/send_command', {
                    command: `v4l2-ctl -d /dev/video0 --set-ctrl contrast=${ this.contrast }`
                });
                console.log(response.data);
                localStorage.setItem('contrast', this.contrast);
            } catch (error) {
                console.error(error)
            }
        },
        reset() {
            this.brightness = 0;
            this.contrast = 50;
            this.sendBrightness();
            this.sendContrast();
            this.sendExposure(0);
        }
    },
}
</script>

<style scoped>
.caption {
    font-size: 1.35rem;
}
.tongue{
  background-color: var(--bg-tertiary);
  border: solid .125rem var(--grey2);
  padding-block: .25rem;
  padding-inline: .5rem;
  border-radius: .85rem;
  font-size: 1.25rem;
  color: var(--text-color);
}
.tongue.active {
    border-color: var(--green);
}

.animate {
    animation-duration: .4s;
    animation-fill-mode: both;
}

.fade {
    animation-name: show;
}
.dropdown-menu {
    background-color: var(--bg-tertiary);
    border: solid var(--grey2) .125rem;
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    border-radius: 1.125rem;
}

@keyframes show {
    from {
        opacity: 0;
        
    }
    to {
        opacity: 1;
        
    }
}

.dropdown-header {
    font-weight: 400;
    color: var(--text-color);
}
.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: .35rem;
    border-radius: 1.125rem;
    border: solid var(--grey2) .125rem;
    outline: nones;
}

.reset {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--grey2);
    padding: .25rem;
    border-radius: 1rem;
    border: none;
}
</style>