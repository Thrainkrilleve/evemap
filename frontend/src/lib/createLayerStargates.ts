import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

export function createLayerStargates(styleFn: any) {
  return new VectorLayer({
    properties: { title: 'Gates' },
    source: new VectorSource({
        url: "/static/evemap/geospatial/stargates_lines.geojson",
        format: new GeoJSON({dataProjection: 'EVE:SYS'}),
      }),
      style: styleFn
  });
}
