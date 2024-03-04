<template>
    <div class="slide p-3 py-1">
        <div class="lin_speed">
            <label for="lin_max_speed_range1" class="form-label">
                <div class="row">
                    <span class="col-auto caption_low">Скорость робота</span> 
                    <span class="col-auto d-flex justify-content-center caption_low pe-0" v-bind:style="linSpeedColorStyle">{{ lin_max_speed }} м/c</span>
                </div>
            </label>
            <input v-on:input="set_linear_speed" type="range" class="form-range" min="0" max="50" value="0" step="5" id="lin_max_speed_range1"/>
        </div>
        <div class="brush_speed">
            <label for="brush_speed_range1" class="form-label">
                <div class="row">
                    <span class="col-auto caption_low">Скорость щётки</span> 
                    <span class="col-auto d-flex justify-content-center caption_low" v-bind:style="brushSpeedColorStyle">{{ brush_speed }} об/м</span>
                </div>
            </label>
            <input v-on:input="set_brush_speed" type="range" class="form-range" min="-50" max="50" value="0" step="5" id="brush_speed_range1"/>
        </div>
        <div class="brush_rotate">
            <label for="brush_rotate_range1" class="form-label">
                <div class="row">
                    <span class="col-auto caption_low">Поворот щетки</span> 
                    <!-- <span class="col-auto d-flex justify-content-center caption_low">{{ aisle_width }} см</span> -->
                </div>
            </label>
            <div class="range-container">
                <div class="letter left">L</div>
                <input type="range" class="form-range" min="0" max="2" value="1" step="1" id="brush_rotate_range1"/>
                <div class="letter right">R</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            lin_max_speed: 0,
            brush_speed: 0,
        }
    },
    computed: {
        linSpeedColorStyle() {
            if (this.lin_max_speed <= 20) {
                return { color: 'var(--green)' };
            } else if (this.lin_max_speed <= 40) {
                return { color: 'var(--orange)' };
            } else {
                return { color: 'var(--red)' };
            }
        },
        brushSpeedColorStyle() {
            if(this.brush_speed >= -20 && this.brush_speed <= 20) {
                return { color: 'var(--green)' };
            } else if (this.brush_speed > -50 && this.brush_speed < -20 || (this.brush_speed > 20 && this.brush_speed < 50)) {
                return { color: 'var(--orange)' };
            } else {
                return { color: 'var(--red)' };
            }
        },
    },
    methods: {
        set_linear_speed() {
            this.lin_max_speed = document.getElementById("lin_max_speed_range1").value
        },
        set_brush_speed() {
            this.brush_speed = document.getElementById("brush_speed_range1").value;
        },
    }

}
</script>

<style scoped>
.slide {
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    border: solid var(--grey2);
}
.caption_low {
    font-size: 1.33rem;
    margin-bottom: -.75rem;
}
.lin_speed {
    margin-bottom: -.75rem;
}
.brush_speed {
    margin-bottom: -.75rem;
}
.range-container {
  position: relative;
}
.letter {
  position: absolute;
  top: .5rem;
  width: 1rem;
  text-align: center;
  font-weight: bold;
  color: var(--text-color);
  -webkit-user-select: none;
  user-select: none;
}
.left {
  left: .5rem;
}
.right {
  right: .5rem;
}
</style>