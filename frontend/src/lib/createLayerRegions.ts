import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

export function createLayerRegions(styleFn: any) {
  return new VectorLayer({
    properties: { title: 'Regions' },
    source: new VectorSource({
      url: "/static/evemap/geospatial/region_stargates_lines.geojson",
      format: new GeoJSON({ dataProjection: 'EVE:SYS' }),
    }),
    style: styleFn
  });
}
