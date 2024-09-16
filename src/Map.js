import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import GeoJSON from 'ol/format/GeoJSON';

const MapComponent = () => {
  useEffect(() => {
    const url = 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/topp:states@EPSG:900913@geojson/{z}/{x}/{-y}.geojson';

    // OSM Basemap Layer
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // VectorTile Layer
    const vectorTileLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new GeoJSON(),
        maxZoom: 19,
        url: url,
        tileLoadFunction: function (tile, url) {
          tile.setLoader(function (extent, resolution, projection) {
            fetch(url)
              .then(function (response) {
                if (response.ok) {
                  return response.text();
                } else {
                  throw new Error('Network response was not ok: ' + response.statusText);
                }
              })
              .then(function (data) {
                console.log('Response Data:', data); // Log response data
                try {
                  const jsons = JSON.parse(data);
                  const format = tile.getFormat();
                  tile.setFeatures(format.readFeatures(jsons));
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                }
              })
              .catch(function (error) {
                console.error('Error fetching tile:', error);
              });
          });
        },
      }),
    });

    // Map setup
    const map = new Map({
      target: 'map', // This should match the id of the div where the map will render
      view: new View({
        center: [0, 0],
        zoom: 2,
        maxZoom: 20,
      }),
      layers: [osmLayer, vectorTileLayer], // Include OSM basemap and custom vector layer
    });

    // Cleanup the map on component unmount
    return () => map.setTarget(null);
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapComponent;
