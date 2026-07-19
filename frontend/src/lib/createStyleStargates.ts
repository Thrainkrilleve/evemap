import { Style, Fill, Stroke, Text } from "ol/style";
import type { FeatureLike } from "ol/Feature";

export function createStyleStargates(getZoom: () => number) {
  return (feature: FeatureLike, resolution: number) => {

    const zoom = getZoom();

	const lineStyle = new Style({
		stroke: new Stroke({
			color: "rgba(255, 255, 255, .05)",
			width: 1,
		  }),
	  });

    if (zoom < 6) {
		  return [];
	  } else {
		  return [lineStyle];
	  }
  };
}
