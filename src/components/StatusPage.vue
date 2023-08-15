<!-- <template>
    <div class="row mt-3">
        <h1>Отладка состояния робота</h1>
        <div class="col-6">
            <h4>C_1</h4>
            <table class="table">
                <thead>
                    <tr>    
                        <th scope="col">#</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Значение</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prop in Object.keys(c1_msg)">
                        <th scope="row">1</th>
                        <td>{{ prop }}</td>
                        <td>{{ c1_msg[prop] }}</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="col-6">
            <h4>C_2</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Значение</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prop in Object.keys(c2_msg)">
                        <th scope="row">1</th>
                        <td>{{ prop }}</td>
                        <td>{{ c2_msg[prop] }}</td>
                    </tr>
                </tbody>
            </table>

        </div>
        
        <div class="col-6">
            <h4>C_E</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Значение</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prop in Object.keys(ce_msg)">
                        <th scope="row">1</th>
                        <td>{{ prop }}</td>
                        <td>{{ ce_msg[prop] }}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template> -->

<template>
    <div class="row mt-5">
        <div class="col-2">
            <select class ="form-select">
                <option selected>Выбор машины</option>
                <option value="1">БКМ 1</option>
                <option value="2">БКМ 2</option>
                <option value="3">БКМ 3</option>
            </select>
        </div>
        <div class="col-4">
            <p>
                <img src="/brush.png" class="img-fluid">
                
            </p>
        </div>
        <div class="col-6">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Датчик</th>
                        <th scope="col">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LiDAR</td>
                        <td>Состояние</td>
                    </tr>
                    <tr>
                        <td>IMU</td>
                        <td>Состояние</td>
                    </tr>
                    <tr>
                        <td>GPS</td>
                        <td>Состояние</td>
                    </tr>
                    <tr>
                        <td>Передняя камера</td>
                        <td>Состояние</td>
                    </tr>
                    <tr>
                        <td>Задняя камера</td>
                        <td>Состояние</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import * as roslib from "../../roslib.js";
import { useConfigStore } from "../stores/ConfigStore";


export default {
    name: "StatusPage",
    components: {},
    data: function () {
        return {
            rstatus: 0,
            refresh_timer: '',
            c1_msg: {},
            c2_msg: {},
            ce_msg: {},
            aa: "",
            ros: "",
            ConfigStore: "",
        }
    },
    mounted: function () {
        this.ConfigStore = useConfigStore()
        this.ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });
        // this.startRefreshing();

        ros.on('connection', function () {
            console.log('Connected to websocket server.');
        });
        
        var listener1 = new ROSLIB.Topic({
            ros: ros,
            name: '/c1_telem',
            messageType: 'mcu_msgs/msg/BldcStatus'
        });
        listener1.subscribe(this.set_c1_msg);
        var listener2 = new ROSLIB.Topic({
            ros: ros,
            name: '/c2_telem',
            messageType: 'mcu_msgs/msg/BldcStatus'
        });
        listener2.subscribe(this.set_c2_msg);
        var listener3 = new ROSLIB.Topic({
            ros: ros,
            name: '/ce_telem',
            messageType: 'mcu_msgs/msg/BldcStatus'
        });
        listener3.subscribe(this.set_ce_msg);
    },
    beforeUnmount() {

    },
    methods: {
        showConfirmModal() {
            console.info("pressed");
        },
        set_c1_msg(msg) {
            this.c1_msg = msg
        },
        set_c2_msg(msg) {
            this.c2_msg = msg
        },
        set_ce_msg(msg) {
            this.ce_msg = msg
        },

    }
}
</script>
<style scoped></style>