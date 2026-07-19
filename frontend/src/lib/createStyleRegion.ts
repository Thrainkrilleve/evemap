import { Style, Circle as CircleStyle, Stroke, Fill, Text } from "ol/style";
import type { FeatureLike } from "ol/Feature";

export function createStyleRegion(getZoom: () => number) {
  return (feature: FeatureLike, resolution: number): Style | Style[] | undefined => {
    const attr = feature.get('security_status');
    const fillColor = getColorForValue(attr, 0.5);
    const zoom = getZoom();
    const radius = Math.max(3, zoom * 0.5); // Ensure a minimum radius
    const region_name = feature.get('region_name') as string | undefined;
    const name = feature.get('name') as string | undefined;
    const geometry = feature.getGeometry();

    if (geometry) {
      const type = geometry.getType();
      if (type === 'Polygon' || type === 'MultiPolygon') {
        return new Style({
          text: name
            ? new Text({
                text: name,
                font: '42px Calibri,sans-serif',
                fill: new Fill({ color: "rgba(255, 255, 255, .1)" }),
                stroke: new Stroke({ color: '#000', width: 1 }),
                offsetY: -3,
                textAlign: 'center',
              })
            : undefined,
        });
      }
    }

    const pointStyle = new Style({
            image: new CircleStyle({
              radius,
              fill: new Fill({ color: fillColor }),
            }),
            text: name
              ? new Text({
                  text: name,
                  font: '12px Calibri,sans-serif',
                  fill: new Fill({ color: "rgba(220, 220, 220, 1)" }),
                  stroke: new Stroke({ color: '#000', width: 1 }),
                  offsetY: 12,
                  textAlign: 'center',
                })
              : undefined,
          });

    if (geometry) {
      const type = geometry.getType();
      if (type === 'LineString' || type === 'MultiLineString') {
        return new Style({
          stroke: new Stroke({
            color: "rgba(255, 255, 255, .05)",
            width: 1,
          }),
        });
      }
    }

    return pointStyle;
  };
}

function getColorForValue(value: number, alpha: number = 0.5): string {
  if (value > 0.9) {
    return `rgba(46, 116, 220, ${alpha})`;
  } else if (value > 0.8) {
    return `rgba(56, 156, 243, ${alpha})`;
  } else if (value > 0.7) {
    return `rgba(74, 207, 242, ${alpha})`;
  } else if (value > 0.6) {
    return `rgba(96, 218, 166, ${alpha})`;
  } else if (value > 0.5) {
    return `rgba(113, 228, 82, ${alpha})`;
  } else if (value > 0.4) {
    return `rgba(238, 255, 131, ${alpha})`;
  } else if (value > 0.3) {
    return `rgba(225, 106, 11, ${alpha})`;
  } else if (value > 0.2) {
    return `rgba(209, 68, 13, ${alpha})`;
  } else if (value > 0.1) {
    return `rgba(188, 17, 20, ${alpha})`;
  } else if (value > 0.0) {
    return `rgba(109, 33, 34, ${alpha})`;
  } else {
    return `rgba(143, 47, 105, ${alpha})`;
  }
}
