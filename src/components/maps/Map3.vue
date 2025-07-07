<template>
    <div id="map3"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const initialMap3 = ref(null);

onMounted(()=> {
    initialMap3.value = L.map('map3', { zoomControl: false,zoom:1,zoomAnimation:false,fadeAnimation:true,markerZoomAnimation:true, attributionControl:false}).setView([55.02240, 73.29929], 16);
    L.tileLayer('/src/assets/Tiles//{z}/{x}/{y}.png', {
        className: 'map-tiles'
    }).addTo(initialMap3.value);
    L.control.zoom({
        position: 'topright',
    }).addTo(initialMap3.value)
});
</script>

<style>
:root {
    --map-tiles-filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

.map-tiles {
    filter:var(--map-tiles-filter);
    transition: all .3s;
}

.leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
        font: 400 1rem 'SF Pro Display';
        text-indent: 1px;
        
    }
</style>

<style scoped>

#map3 {
    min-height: 100%;
}
</style>

