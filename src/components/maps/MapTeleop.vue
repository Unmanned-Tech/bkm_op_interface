<template>
    <div id="mapTeleop"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';

const initialMapTeleop = ref(null);

onMounted(()=> {
    initialMapTeleop.value = L.map('mapTeleop', { zoomControl: false,zoom:1,zoomAnimation:false,fadeAnimation:true,markerZoomAnimation:true, attributionControl:false}).setView([55.02240, 73.29929], 16);
    L.tileLayer('/src/assets/Tiles//{z}/{x}/{y}.png', {
        className: 'map-tiles'
    }).addTo(initialMapTeleop.value);
    L.control.zoom({
        position: 'topright',
    }).addTo(initialMapTeleop.value)
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
div.leaflet-control-zoom.leaflet-bar.leaflet-control {
    margin-top: 5rem;
    @media (max-width: 896px) {
        scale: .7;
    }
}


</style>

<style scoped>

#mapTeleop {
    min-height: 100%;
}
</style>

