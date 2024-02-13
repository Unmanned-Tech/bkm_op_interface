<template>
    <div class="segmented-control">
        <span class="selection"></span>
        <div class="option">
            <input type="radio" id="bkm1" name="sample" value="bkm1" checked>
            <label for="bkm1"><span>БКМ-1</span></label>
        </div>
        <div class="option">
            <input type="radio" id="bkm2" name="sample" value="bkm2">
            <label for="bkm2"><span>БКМ-2</span></label>
        </div>
        <div class="option">
            <input type="radio" id="bkm3" name="sample" value="bkm3">
            <label for="bkm3"><span>БКМ-3</span></label>
        </div>
    </div>
</template>

<script setup>
    const SEGMENTED_CONTROL_BASE_SELECTOR = ".segmented-control";
    const SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR = ".segmented-control .option input";
    const SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR = ".segmented-control .selection";

    document.addEventListener("DOMContentLoaded", setup);

    function setup() {
        
        document.body.addEventListener("input", function(event) {
            const segmentedControl = event.target.closest(SEGMENTED_CONTROL_BASE_SELECTOR);

            if (segmentedControl) {
                updatePillPosition(segmentedControl);
            }
        });

        window.addEventListener("resize", updatePillPosition);
    }

    function updatePillPosition(segmentedControl) {
        const selectedInput = segmentedControl.querySelector(SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR + ":checked");
        const selectedIndex = Array.from(segmentedControl.querySelectorAll(SEGMENTED_CONTROL_INDIVIDUAL_SEGMENT_SELECTOR)).indexOf(selectedInput);

        const backgroundPill = segmentedControl.querySelector(SEGMENTED_CONTROL_BACKGROUND_PILL_SELECTOR);
        backgroundPill.style.transform = "translateX(" + (selectedInput.offsetWidth * selectedIndex) + "px)";
    }


</script>

<style scoped>

body, html {
	height: 100%;
	margin: 0;
	padding: 0;
	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-overflow-scrolling: touch!important;
	touch-action: manipulation!important;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
		display: flex;
	}

* {
	box-sizing: border-box;
}

label {
	cursor:inherit;
}
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
    -webkit-transition: background .2s ease;
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
    opacity: 0;
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
    -webkit-transition: transform .2s ease;
    transition: transform .2s ease;
}

.segmented-control .option label span {
    display: block;
    position: relative;
    z-index: 2;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
    will-change: transform;
}
.segmented-control .option input:checked+label span {
    font-weight: 700;
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