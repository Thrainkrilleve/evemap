import { Style, Circle as CircleStyle, Stroke, Fill, Text } from "ol/style";
import type { FeatureLike } from "ol/Feature";

export function createStyleSolarSystems(
    getZoom: () => number,
) {
    return (feature: FeatureLike, resolution: number) => {
        const attr = feature.get('security_status');
        const fillColor = getColorForValue(attr, 0.5);
        const zoom = getZoom();
        const radius = 0 + (zoom * 0.5);
        const name = feature.get('name');

        const farPointStyle = new Style({
        image: new CircleStyle({
            radius,
            fill: new Fill({ color: fillColor }),
        }),
        });

        const closePointStyle = new Style({
            image: new CircleStyle({
            radius,
            fill: new Fill({ color: fillColor }),
            }),
            text: new Text({
                text: name,
                font: '.8rem Calibri,sans-serif',
                fill: new Fill({ color: "rgba(220, 220, 220, 1)" }),
                stroke: new Stroke({ color: '#000', width: 1 }),
                offsetY: 12,
                textAlign: 'center',
            }),
        });

        if (zoom > 6.5) {
		    return [closePointStyle];
	    } else {
		    return [farPointStyle];
	    }
    }
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
