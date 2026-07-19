import { Style, Fill, Stroke, Text } from "ol/style";
import type { FeatureLike } from "ol/Feature";

export function createStyleRegions(getZoom: () => number) {
  return (feature: FeatureLike, resolution: number) => {
    const name = feature.get('name') ?? '';
    const securityStatus = feature.get('avg_security') ?? '';
	let securityStatusText = securityStatus !== '' ? String(securityStatus) : '';
    const borderColor = getColorForValue(securityStatus, 1);

    const zoom = getZoom();

    const securityBoxStyle = new Style({
      text: new Text({
        text: securityStatus ? String(securityStatusText) : '',
        font: '10px',
        fill: new Fill({ color: borderColor }),
		textAlign: 'center',
    	textBaseline: 'middle',
        offsetY: -5,
        stroke: new Stroke({ color: '#000', width: 1 }),
      }),
    });

    const smallNameStyle = new Style({
      text: new Text({
        text: name,
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: "rgba(220, 220, 220, .9)" }),
        stroke: new Stroke({ color: '#000', width: 1 }),
        offsetY: -3,
        textAlign: 'center',
      }),
    });

    const largeNameStyle = new Style({
      text: new Text({
        text: name,
        font: '42px Calibri,sans-serif',
        fill: new Fill({ color: "rgba(255, 255, 255, .1)" }),
        stroke: new Stroke({ color: '#000', width: 1 }),
        offsetY: -3,
        textAlign: 'center',
      }),
    });

	  const lineStyle = new Style({
		  stroke: new Stroke({
        color: "rgba(255, 255, 255, .2)",
        width: 1,
      }),
	  });

    if (zoom > 6) {
		  return [/*securityBoxStyle, */largeNameStyle];
	  } else {
		  return [/*securityBoxStyle, */smallNameStyle, lineStyle];
	  }
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
