import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { useFeature } from "../contexts/FeatureContext";
import { createLayerRegionPlan } from "../lib/createLayerRegionPlan";
import { createStyleSolarSystems } from "../lib/createStyleSolarSystems";
import { Button } from "@/components/ui/button";

const RegionPlanView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null); // Store map instance
  const { setFeature } = useFeature();
  const { regionName } = useParams<{ regionName: string }>();
  const [features, setFeatures] = useState<any[]>([]);
  const overlayRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const overlaysRef = useRef<{ [id: string]: Overlay }>({});
  const [overlaysVisible, setOverlaysVisible] = useState(true);


  const [apiData, setApiData] = useState<any[]>([]);

  // Map initialization
  useEffect(() => {
    if (!regionName) return;

    const regionPlanLayer = createLayerRegionPlan(regionName, createStyleSolarSystems);
    const map = new Map({
      target: mapRef.current as HTMLElement,
      layers: [regionPlanLayer],
      controls: [],
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
    });

    mapInstanceRef.current = map;

    map.on('click', (evt: any) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
        setFeature({ name: feature.get("name"), details: "" });
        return true;
      });
    });

    map.on('pointermove', (evt: any) => {
      if (!evt.dragging) {
        map.getTargetElement().style.cursor =
          map.hasFeatureAtPixel(map.getEventPixel(evt.originalEvent)) ? 'pointer' : '';
      }
    });

    const source = regionPlanLayer.getSource();
    const fitToLayer = () => {
      if (source && source.getFeatures().length > 0) {
        const extent = source.getExtent();
        map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
      }
    };

    const handleSourceChange = () => {
      if (source && source.getState() === 'ready') {
        fitToLayer();
        setFeatures(source.getFeatures());
      }
    };

    if (source) {
      source.on('change', handleSourceChange);
      if (source.getState() === 'ready') {
        handleSourceChange();
      }
    }

    return () => {
      if (source) source.un('change', handleSourceChange);
      map.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, [regionName, setFeature]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(overlaysRef.current).forEach((overlay) => {
      map.removeOverlay(overlay);
    });
    overlaysRef.current = {};

    // Add overlays for current features
    if (overlaysVisible) {
      features.forEach((feature) => {
        const geometry = feature.getGeometry();
        if (geometry && geometry.getType() === 'Point') {
          const id = feature.getId() || feature.get('id');
          const element = overlayRefs.current[id];
          if (element) {
            const overlay = new Overlay({
              position: geometry.getCoordinates(),
              positioning: 'bottom-center',
              element,
              stopEvent: false,
            });
            map.addOverlay(overlay);
            overlaysRef.current[id] = overlay;
          }
        }
      });
    }

    fetch(`/evemap/api/universe/region-plan-details/${regionName}`)
    .then(res => res.json())
    .then(setApiData)
    .catch(console.error);

    return () => {
      Object.values(overlaysRef.current).forEach((overlay) => {
        map.removeOverlay(overlay);
      });
      overlaysRef.current = {};
    };
  }, [features, overlaysVisible]);

  if (!regionName) {
    return <div>Region not found</div>;
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>

      <Button className="cursor-pointer" onClick={() => setOverlaysVisible((v) => !v)}>
        {overlaysVisible ? "Hide Info" : "Show Info"}
      </Button>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
      />
      {features.map((feature) => {
        const id = feature.getId() || feature.get('id');
        const apiItem = apiData.find(item => item.id === id);
        console.log(apiItem);
        if (feature.getGeometry().getType() === 'Point') {
          return (
            <div
              key={id}
              ref={(el: HTMLDivElement | null) => {
                if (id) {
                  overlayRefs.current[id] = el;
                }
              }}
              style={{ pointerEvents: 'auto', }}
              className="region-plan-details"
            >
              <div >
                {feature.get('name')}
                <div>
                  Security: {apiItem ? apiItem.security_status : feature.get('id')}
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default RegionPlanView;
