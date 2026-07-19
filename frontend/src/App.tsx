import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { FeatureProvider } from "./contexts/FeatureContext";
import MapView from "./components/MapView";
import RegionView from "./components/RegionView";
import RegionPlanView from "./components/RegionPlanView";
import FeatureInfo from "./components/FeatureInfo";

const App: React.FC = () => {
  return (
    <FeatureProvider>
      <div style={{ position: "relative", width: "100%", height: "calc(100vh - 6rem)", backgroundColor: "#000" }}>
      <BrowserRouter>
          <Routes>
            <Route path="/evemap" element={<MapView />} />
            <Route path="/evemap/region/:regionName" element={<RegionView />} />
            <Route path="/evemap/region-plan/:regionName" element={<RegionPlanView />} />
          </Routes>
          <FeatureInfo />
        </BrowserRouter>
      </div>
    </FeatureProvider>
  );
};

export default App;
