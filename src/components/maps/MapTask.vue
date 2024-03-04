<template>
    <div id="map"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const initialMap1 = ref(null);

onMounted(()=> {
    initialMap1.value = L.map('map', { zoomControl: false,zoom:1,zoomAnimation:false,fadeAnimation:true,markerZoomAnimation:true, attributionControl:false}).setView([55.02240, 73.29929], 17);
    L.tileLayer('/src/assets/Tiles//{z}/{x}/{y}.png', {
        className: 'map-tiles'
    }).addTo(initialMap1.value);
    L.control.zoom({
        position: 'topright',
    }).addTo(initialMap1.value)
});
</script>

<style>
:root {
    --map-tiles-filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

.map-tiles {
    filter:var(--map-tiles-filter);
}

.leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
        font: bold 1rem 'SF Pro Rounded';
        text-indent: 1px;
    }
</style>

<style scoped>
#map {
    min-height: 100%;
}
</style>

