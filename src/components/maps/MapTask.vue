<template>
    <div>
        <div id="map" class="maper"></div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
// import 'leaflet-draw';
import '~leafletdraw/leaflet.draw'

export default {
    mounted: function() {
        var map = L.map('map', { 
            zoomControl: false,
            zoom:1,
            zoomAnimation:false,
            fadeAnimation:true,
            markerZoomAnimation:true, 
            attributionControl:false
        }).setView([55.02240, 73.29929], 17);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            className: 'map-tiles',
        }).addTo(map);
        L.control.zoom({
            position: 'topright',
        }).addTo(map);
        
        var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);
        
        var MyCustomMarker = L.Icon.extend({
            options: {
                shadowUrl: null,
                iconAnchor: new L.Point(12, 12),
                iconSize: new L.Point(24, 24),
                iconUrl: '/src/assets/battery.svg'
            }
        });
        var options = {
            position: 'topleft',
            draw: {
                polyline: {
                    shapeOptions: {
                        color: '#f357a1',
                        weight: 7
                    }
                },
                polygon: {
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: '#e1e100', // Color the shape will turn when intersects
                        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: '#bada55'
                    }
                },
                circle: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
                circlemarker: false
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: true
            }
        };
        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);
        
        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType,
                layer = e.layer;
        
            if (type === 'polygon' || type === 'polyline') {
                var coordinates = layer.getLatLngs();
                console.log(coordinates);
            }
        
            editableLayers.addLayer(layer);
        });
        
        map.on('draw:drawstart', function () {
            map.dragging.disable();
        });

        map.on('draw:drawstop', function () {
            map.dragging.enable();
        });
    },
}
</script>

<style>
:root {
    --map-tiles-filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

.map-tiles {
    filter:var(--map-tiles-filter);
}
</style>

<style scoped>
#map {
    min-height: 100%;
}
.maper {
  border: solid var(--grey2) .25rem;
  border-radius: 1.125rem;
  height: 25rem;
}
</style>

