import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { useFeature } from "../contexts/FeatureContext";
import eveProjection from "../lib/eveProjection";
import { createLayerRegion } from "../lib/createLayerRegion";
import { createStyleRegion } from "../lib/createStyleRegion";

const RegionView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { setFeature } = useFeature();
  const navigate = useNavigate();
  const { regionName } = useParams<{ regionName: string }>();
  if (!regionName) {
    return <div>Region not found</div>;
  }
  const regionLayer = createLayerRegion(regionName, createStyleRegion);
  let getZoom = () => 1;

  useEffect(() => {
    const map = new Map({
      target: mapRef.current as HTMLElement,
      layers: [],
      controls: [],
      view: new View({
        projection: eveProjection,
        center: [0, 0],
        zoom: 1,
        extent: eveProjection.getExtent(),
      }),
    });

    getZoom = () => map.getView().getZoom() ?? 1;
    regionLayer.setStyle(createStyleRegion(getZoom));
    map.addLayer(regionLayer);

    // click feature
    map.on('click', (evt: import("ol/MapBrowserEvent").default<any>) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        setFeature({ name: feature.get("name"), details: "" });
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

    // Adjust the map view once loaded
    const source = regionLayer.getSource();
    const fitToLayer = () => {
      if (source && source.getFeatures().length > 0) {
        const extent = source.getExtent();
        map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
      }
    };
    source?.on('change', () => {
      if (source.getState() === 'ready') {
        fitToLayer();
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Button className="cursor-pointer" onClick={() => navigate(`/evemap/region-plan/${regionName}/`)}>
        Plan View
      </Button>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "90%" }}
      />
    </div>
  );
};

export default RegionView;
