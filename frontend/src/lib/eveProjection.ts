import Projection from "ol/proj/Projection";

const eveProjection = new Projection({
  code: "EVE:SYS",
  units: "m",
  extent: [
    -1000000000000000000,
    -1000000000000000000,
    1000000000000000000,
    1000000000000000000,
  ],
  global: false,
  metersPerUnit: 1,
});

export default eveProjection;
