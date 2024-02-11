<template>
    <button class="set" @click="lightThemeSwitch">
        <sunLightSVG v-if="!isLightTheme"/>
        <sunDarkSVG v-if="isLightTheme" />
    </button>
</template>

<script>
import sunLightSVG from '/src/assets/sun-light.svg';
import sunDarkSVG from '/src/assets/sun-dark.svg';

export default {
    components: {
        sunLightSVG,
        sunDarkSVG,
    },
    data: function () {
        return {
            isLightTheme: false,
        };
    },


    mounted: function() {
        this.checkLightThemeExistence();
    },

    methods: {
        _addLightTheme() {
            let lightThemeLinkEl = document.createElement("link");
            lightThemeLinkEl.setAttribute("rel", "stylesheet");
            lightThemeLinkEl.setAttribute("href", "/src/assets/lightTheme.scss");
            lightThemeLinkEl.setAttribute("id", "light-theme-style");

            let docHead = document.querySelector("head");
            docHead.append(lightThemeLinkEl);
            this.isLightTheme = true;

        },
        _removeLightTheme() {
            let lightThemeLinkEl = document.querySelector("#light-theme-style");
            let parentNode = lightThemeLinkEl.parentNode;
            parentNode.removeChild(lightThemeLinkEl);

            this.isLightTheme = false;
        },
        lightThemeSwitch() {
            let lightThemeLinkEl = document.querySelector("#light-theme-style");
            if (!lightThemeLinkEl) {
                this._addLightTheme()
            } else {
                this._removeLightTheme()
            }
        },
        checkLightThemeExistence() {

            this.isLightTheme = !!document.querySelector("#light-theme-style");
        },
        
       
    
    },
};
</script>

<style scoped>

.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.5rem;
    border-radius: 1.125rem;
    position: absolute;
    border: none;
  }

</style>