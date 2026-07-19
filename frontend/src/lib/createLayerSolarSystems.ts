import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

export function createLayerSolarSystems(styleFn: any) {
  return new VectorLayer({
    properties: { title: 'Solar Systems' },
    source: new VectorSource({
      url: "/static/evemap/geospatial/solar_systems.geojson",
      format: new GeoJSON({ dataProjection: 'EVE:SYS' }),
    }),
    style: styleFn,
  });
}
