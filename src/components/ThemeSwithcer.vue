<template>
    <button class="set" @click="lightThemeSwitch">
        <svg width="46" height="46" viewBox="0 0 56 56" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.9001 21.5133C42.6767 21.5133 40.9501 18.5266 43.0501 14.8633C44.2634 12.7399 43.5401 10.0333 41.4167 8.81993L37.3801 6.50993C35.5367 5.41327 33.1567 6.0666 32.0601 7.90993L31.8034 8.35327C29.7034 12.0166 26.2501 12.0166 24.1267 8.35327L23.8701 7.90993C22.8201 6.0666 20.4401 5.41327 18.5967 6.50993L14.5601 8.81993C12.4367 10.0333 11.7134 12.7633 12.9267 14.8866C15.0501 18.5266 13.3234 21.5133 9.10008 21.5133C6.67341 21.5133 4.66675 23.4966 4.66675 25.9466V30.0533C4.66675 32.4799 6.65008 34.4866 9.10008 34.4866C13.3234 34.4866 15.0501 37.4733 12.9267 41.1366C11.7134 43.2599 12.4367 45.9666 14.5601 47.1799L18.5967 49.4899C20.4401 50.5866 22.8201 49.9333 23.9167 48.0899L24.1734 47.6466C26.2734 43.9833 29.7267 43.9833 31.8501 47.6466L32.1067 48.0899C33.2034 49.9333 35.5834 50.5866 37.4267 49.4899L41.4634 47.1799C43.5867 45.9666 44.3101 43.2366 43.0967 41.1366C40.9734 37.4733 42.7001 34.4866 46.9234 34.4866C49.3501 34.4866 51.3567 32.5033 51.3567 30.0533V25.9466C51.3334 23.5199 49.3501 21.5133 46.9001 21.5133ZM28.0001 35.5833C23.8234 35.5833 20.4167 32.1766 20.4167 27.9999C20.4167 23.8233 23.8234 20.4166 28.0001 20.4166C32.1767 20.4166 35.5834 23.8233 35.5834 27.9999C35.5834 32.1766 32.1767 35.5833 28.0001 35.5833Z" />
        </svg>
    </button>
</template>

<script>
export default {
    data: function () {
        return {
            
        }
    },
    methods: {
        _addLightTheme() {
            let lightThemeLinkEl = document.createElement("link");
            lightThemeLinkEl.setAttribute("rel", "stylesheet");
            lightThemeLinkEl.setAttribute("href", "/src/assets/lightTheme.scss");
            lightThemeLinkEl.setAttribute("id", "light-theme-style");

            let docHead = document.querySelector("head");
            docHead.append(lightThemeLinkEl);
        },
        _removeLightTheme() {
            let lightThemeLinkEl = document.querySelector("#light-theme-style");
            let parentNode = lightThemeLinkEl.parentNode;
            parentNode.removeChild(lightThemeLinkEl);
        },
        lightThemeSwitch() {
            let lightThemeLinkEl = document.querySelector("#light-theme-style");
            if (!lightThemeLinkEl) {
                this._addLightTheme()
            } else {
                this._removeLightTheme()
            }
            this.changeImage();
        }
    }


}
</script>

<style scoped>

.set {
    box-shadow: 0rem 0.1875rem 0.25rem 0rem rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    padding: 0.3125rem;
    border-radius: 1.125rem;
    position: absolute;
    border: none;
  }

</style>