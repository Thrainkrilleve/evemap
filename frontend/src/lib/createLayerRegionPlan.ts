import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Circle as CircleStyle, Fill, Text} from "ol/style";

export function createLayerRegionPlan(regionName: string, styleFn: any) {
  return new VectorLayer({
    properties: { title: 'Region Gates' },
    source: new VectorSource({
        url: `/evemap/api/geospatial/region-plan/${regionName}`,
        format: new GeoJSON(),
      }),
      style: (feature, resolution) => {
        return new Style({
          stroke: new Stroke({
            color: "rgba(255, 255, 255, .5)",
            width: 1,
          }),
          image: new CircleStyle({
            radius: 2,
            fill: new Fill({ color: 'red' }),
          }),
          text: new Text({
            text: feature.get('name') || '',
            font: 'bold 12px Calibri,sans-serif',
            fill: new Fill({ color: '#fff' }),
            offsetY: -15,
            placement: 'point'
          })
        })
      }
  });
}
