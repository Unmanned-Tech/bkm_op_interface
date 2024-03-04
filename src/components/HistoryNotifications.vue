<template>
    <div>
        <div class="row mt-3">
            <div class="col d-flex mt-auto mb-auto">
                <button class="button" @click="goBack">
                    <div class="col svg me-1 d-flex align-items-center justify-content-center"><arrowSVG /></div>
                    <div class="col p-0 me-3">Назад</div>
                </button>        
            </div>
            <div class="col d-flex justify-content-end">
                <span class="header">
                    История уведомлений
                </span>
            </div>
        </div>
        <div class="row line mb-3 mt-3"></div>
        <div class="row">
            <div class="col-6 pe-1">
                <segmentedForStatus />
            </div>
            <div class="col-auto d-flex">
                <select v-model="selectedOption" class="form__select">
                    <option selected>Тип уведомления</option>
                    <option value="1">Системные</option>
                    <option value="2">Информ.</option>
                    <option value="3">Предупрежд.</option>
                    <option value="4">Критические</option>
                </select>
            </div>
            <div class="col-auto d-flex justify-content-center align-items-center">
                <div class="set">
                    <i class="bi bi-calendar"></i>
                </div>
            </div>
            <div class="col-auto">
                <formSearch @search="handleSearch"/>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-auto">
                <table class="tab">
                    <tr>
                        <th class="thead start">Время</th>
                        <th class="thead mid">Робот</th>
                        <th class="thead mid">Тип</th>
                        <th class="thead end">Уведомление</th>
                    </tr>
                    <tr v-for="(item, index) in newTableData" :key="index">
                        <td :class="{ 'last-cell-left': isLastColumn(index) }">{{ item.time }}</td>
                        <td class="mid">{{ item.robot }}</td>
                        <td class="mid" v-html="item.type"></td>
                        <td class="mid notif" :class="{ 'last-cell-right': isLastColumn(index) }">{{ item.notification }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    
</template>

<script>
import * as roslib from "../../roslib.js";
import { useConfigStore } from "../stores/ConfigStore";
import segmentedForStatus from "./ButtonsBKM/segmentedForStatus.vue";
import formSearch from "./ButtonsBKM/formSearch.vue";
import { fetchDataByOption1 } from "./fetchDataByOption"
import { useThreeStore } from '../stores/store';
import { ref, computed } from 'vue';
import arrowSVG from '/src/assets/arrow.svg';
import { useRouter } from 'vue-router';


export default {
    name: "StatusPage",
    components: {
        segmentedForStatus,
        formSearch,
        arrowSVG
    },
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
        };
    },
    setup() {
        const router = useRouter();
        const store = useThreeStore();
        const searchQuery = ref("");
        const selectedOption = ref("");
        const selectedStatus = computed(() => {
            switch (selectedOption.value) {
                case "1":
                    return "Сист";
                case "2":
                    return "Инф";
                case "3":
                    return "Пред";
                case "4":
                    return "Крит";
                default:
                    return "";
            }
        });

        const isLastColumn = ref((index) => {
            return index === newTableData.value.length - 1;
        });
        const newTableData = computed(() => fetchDataByOption1(store.threeSelectedOption, searchQuery.value, selectedStatus.value));


        function handleSearch(query) {
            searchQuery.value = query;
        }

        function goBack() {
            router.push({ name: 'MainPage' })
        };

        return {
            store,
            isLastColumn,
            newTableData,
            handleSearch,
            selectedOption,
            selectedStatus,
            goBack
        }
    },
    mounted: function () {
        
        this.ConfigStore = useConfigStore();
        this.ros = new ROSLIB.Ros({ url: "ws://192.168.1.1:9090" });

        this.ros.on('connection', () => {
            console.log('Connected to websocket server.');
        });

        var listener1 = new ROSLIB.Topic({
            ros: this.ros,
            name: '/c1_telem',
            messageType: 'mcu_msgs/msg/BldcStatus'
        });
        listener1.subscribe(this.set_c1_msg.bind(this));
        var listener2 = new ROSLIB.Topic({
            ros: this.ros,
            name: '/c2_telem',
            messageType: 'mcu_msgs/msg/BldcStatus'
        });
        listener2.subscribe(this.set_c2_msg.bind(this));
        var listener3 = new ROSLIB.Topic({
            ros: this.ros,
            name: '/ce_telem',
            messageType: 'mcu_msgs/msg/BldcStatus'
        });
        listener3.subscribe(this.set_ce_msg.bind(this));
        
    },
    methods: {
        showConfirmModal() {
            console.info("pressed");
        },
        set_c1_msg(msg) {
            this.c1_msg = msg;
        },
        set_c2_msg(msg) {
            this.c2_msg = msg;
        },
        set_ce_msg(msg) {
            this.ce_msg = msg;
        },
    }
}
</script>

<style>
i.bi-exclamation-triangle {
    font-size: 2rem;
    color: var(--text-color);
    background-color: var(--orange);
    padding: 3px 20px;
    border-radius: 1.125rem;
}
i.bi-exclamation-diamond {
    font-size: 2rem;
    color: var(--text-color);
    background-color: var(--red);
    padding: 3px 20px;
    border-radius: 1.125rem;
}
i.bi-info-circle {
    font-size: 2rem;
    color: var(--text-color);
    background-color: var(--green);
    padding: 3px 20px;
    border-radius: 1.125rem;
}
i.bi-check-circle {
    font-size: 2rem;
    color: var(--text-color);
    background-color: var(--blue);
    padding: 3px 20px;
    border-radius: 1.125rem;
}

</style>

<style scoped>
.last-cell-left {
  border-bottom-left-radius: 1.125rem;
}
.last-cell-right {
  border-bottom-right-radius: 1.125rem;
}
.form__select {
    font-weight: 400;
    font-size: 1.25rem;
    border: 0;
    padding: 0 .75rem;
    text-align: center;
    align-items: center;
    color: var(--text-color);
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    box-shadow: 0 .1875rem .25rem 0 rgba(0, 0, 0, .25);
    outline: none;
}

input {
    outline: none;
}
option {
    font-size: 1.125rem;
    outline: none;
}
.bi-calendar {
    font-size: 1.75rem;
}
.set {
    background-color: var(--bg-tertiary);
    padding: 7px .875rem;
    box-shadow: 0 .1875rem .25rem 0 rgba(0, 0, 0, .25);
    border-radius: 1.125rem;
}

.tab {
  border-radius: 1.125rem;
  border-collapse: separate;
  text-align: center;
  border-spacing: 0;
}
.thead {
    font: 700 1.75rem "SF Pro Display";
    padding: .5rem 1.25rem;
    border: .125rem solid var(--grey);
    background-color: var(--grey2);
}
.thead.start {
  padding: .5rem 4rem;
  border-top-left-radius: 1.125rem;
}
.thead.mid {
  border-left: none;
  padding: 0 1.5rem;
}
.mid {
    border-left: none;
}
.end {
  border-top-right-radius: 1.125rem;
  padding: .5rem 15rem;
  border-left: none;
}
td {
  font-weight: 400;
  font-size: 1.5rem;
  border: .125rem solid var(--grey);
  background-color: var(--bg-tertiary);
  padding: .5rem;
  border-top: none;
}
.notif {
    text-align: left;
}

.button {
    box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, .25);
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    color: var(--text-color);
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 1.75rem;
    padding: .5rem .75rem;
    text-decoration: none;
}
.header {
    font-weight: 400;
    font-size: 2.25rem;
    background-color: var(--bg-tertiary);
    border-radius: 1.125rem;
    padding: .5rem 1.5rem;
    border: solid .125rem var(--grey);
}
.line {
    border-top: solid .125rem var(--bg-tertiary);
}
.svg {
    padding: 0;
    transform: rotate(180deg) scale(0.8);
    
}
</style>