import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

export function createLayerRegion(regionName: string, styleFn: any) {
  return new VectorLayer({
    properties: { title: 'Region' },
    source: new VectorSource({
      url: `/evemap/api/geospatial/region/${regionName}`,
      format: new GeoJSON({ dataProjection: 'EVE:SYS' }),
    }),
    style: styleFn,
  });
}
