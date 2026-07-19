import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { useFeature } from "../contexts/FeatureContext";
import eveProjection from "../lib/eveProjection";
import { createLayerRegions } from "../lib/createLayerRegions";
import { createLayerSolarSystems } from "../lib/createLayerSolarSystems";
import { createLayerStargates } from "../lib/createLayerStargates";
import { createStyleRegions } from "../lib/createStyleRegions";
import { createStyleSolarSystems } from "../lib/createStyleSolarSystems";
import { createStyleStargates } from "../lib/createStyleStargates";

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { setFeature } = useFeature();

  let getZoom = () => 1;
  let navigate = useNavigate();

  const stargatesLinesStyle = createStyleStargates(getZoom);
  const solarSystemsStyle = createStyleSolarSystems(getZoom);
  const solarSystemsLayer = createLayerSolarSystems(solarSystemsStyle);
  const stargatesLayer = createLayerStargates(stargatesLinesStyle);
  const regionsLayer = createLayerRegions(createStyleRegions);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current as HTMLElement,
      layers: [],
      controls: [],
      view: new View({
        projection: eveProjection,
        center: [0, 0],
        zoom: 3,
        extent: eveProjection.getExtent(),
      }),
    });

    getZoom = () => map.getView().getZoom() ?? 1;
    solarSystemsLayer.setStyle(createStyleSolarSystems(getZoom));
    map.addLayer(solarSystemsLayer);
    stargatesLayer.setStyle(createStyleStargates(getZoom));
    map.addLayer(stargatesLayer);
    regionsLayer.setStyle(createStyleRegions(getZoom));
    map.addLayer(regionsLayer);

    // click feature
    map.on('click', (evt: import("ol/MapBrowserEvent").default<any>) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        // Region - load RegionView
        if (layer.get('title') == 'Regions') {
          navigate(`/evemap/region/${feature.get("name")}/`);
        }
        // System - Populate info box
        if (layer.get('title') == 'Solar Systems') {
          setFeature({ name: feature.get("name"), details: "" });
        }
        return true;
      });
    });

    // change cursor
    map.on('pointermove', (evt: import("ol/MapBrowserEvent").default<any>) => {
      if (!evt.dragging) {
        map.getTargetElement().style.cursor =
          map.hasFeatureAtPixel(map.getEventPixel(evt.originalEvent)) ? 'pointer' : '';
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MapView;
