import React, { createContext, useState, useContext } from "react";

type FeatureData = { name: string; details: string } | null;

const FeatureContext = createContext<{
  feature: FeatureData;
  setFeature: React.Dispatch<React.SetStateAction<FeatureData>>;
}>({ feature: null, setFeature: () => {} });

export const useFeature = () => useContext(FeatureContext);

export const FeatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feature, setFeature] = useState<FeatureData>(null);
  return (
    <FeatureContext.Provider value={{ feature, setFeature }}>
      {children}
    </FeatureContext.Provider>
  );
};
