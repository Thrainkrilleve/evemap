import React, { useEffect, useState } from "react";
import { useFeature } from "../contexts/FeatureContext";

const FeatureInfo: React.FC = () => {
  const { feature } = useFeature();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (feature) {
      fetch(`/evemap/api/universe/system/${feature.name}`)
        .then(res => res.json())
        .then(setData);
    }
  }, [feature]);

  if (!feature) return null;
  if (!data) return <div>Loading...</div>;
  const { name, security_status, planets, asteroid_belts } = data;

  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, background: "black", padding: 16, zIndex: 1000 }}>
      <table>
        <tr>
          <th style={{ textAlign: "left" }}>System</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th style={{ textAlign: "left" }}>Security Status</th>
          <td>{security_status}</td>
        </tr>
        <tr>
          <th style={{ textAlign: "left" }}>Planets</th>
          <td>{planets}</td>
        </tr>
        <tr>
          <th style={{ textAlign: "left" }}>Asteroid Belts</th>
          <td>{asteroid_belts}</td>
        </tr>
      </table>
    </div>
  );
};

export default FeatureInfo;
