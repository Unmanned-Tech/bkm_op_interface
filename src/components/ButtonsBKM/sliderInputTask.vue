<template>
    <div class="lin_speed">
        <label for="lin_max_speed_range" class="form-label w-100">
            <div class="row">
                <span class="col-8 caption pe-0">Скорость робота</span> 
                <span class="col-4 d-flex justify-content-center caption_low p-0" v-bind:style="linSpeedColorStyle">{{ lin_max_speed }} м/c</span>
            </div>
        </label>
        <input v-on:input="set_linear_speed" type="range" class="form-range" min="0" max="15" value="0" step="1" id="lin_max_speed_range"/>
    </div>
    <div class="brush_speed">
        <label for="brush_speed_range" class="form-label w-100">
            <div class="row">
                <span class="col-8 caption pe-0">Скорость щётки</span> 
                <span class="col-4 d-flex justify-content-center caption_low p-0" v-bind:style="brushSpeedColorStyle">{{ brush_speed }} об/м</span>
            </div>
        </label>
        <input v-on:input="set_brush_speed" type="range" class="form-range" min="-200" max="400" value="0" step="20" id="brush_speed_range"/>
    </div>
    <div class="aisle_width">
        <label for="aisle_width" class="form-label w-100">
            <div class="row">
                <span class="col-8 caption pe-0">Ширина прохода</span> 
                <span class="col-4 d-flex justify-content-center caption_low p-0">{{ aisle_width }} см</span>
            </div>
        </label>
        <input v-on:input="set_aisle_width" type="range" class="form-range" min="40" max="80" value="40" step="5" id="aisle_width_range"/>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            lin_max_speed: 0,
            brush_speed: 0,
            aisle_width: 40,
        }
    },
    computed: {
        linSpeedColorStyle() {
            if (this.lin_max_speed <= 5) {
                return { color: 'var(--green)' };
            } else if (this.lin_max_speed <= 10) {
                return { color: 'var(--orange)' };
            } else {
                return { color: 'var(--red)' };
            }
        },
        brushSpeedColorStyle() {
            if(this.brush_speed >= -75 && this.brush_speed <= 140) {
                return { color: 'var(--green)' };
            } else if (this.brush_speed > -150 && this.brush_speed < -75 || (this.brush_speed > 75 && this.brush_speed < 280)) {
                return { color: 'var(--orange)' };
            } else {
                return { color: 'var(--red)' };
            }
        },
    },
    methods: {
        set_linear_speed() {
            this.lin_max_speed = document.getElementById("lin_max_speed_range").value
        },
        set_brush_speed() {
            this.brush_speed = document.getElementById("brush_speed_range").value;
        },
        set_aisle_width() {
            this.aisle_width = document.getElementById("aisle_width_range").value;
        },
    }

}
</script>

<style scoped>
.caption {
    font-size: 1.95rem;
}
.caption_low {
    font-size: 1.75rem;
}
</style>