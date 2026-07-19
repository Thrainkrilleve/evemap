Spatial data is cached in geojson files.

Faciliates administrators to install the app without the dependency of pre-populating the database with the entire eve-universe + stargates.  

- `/static/evemap/geospatial/`  
Called by the frontend directly, separate files provides more control around styling.  
Sunstantially faster than direct db calls

- `/data/regions.geojson`  
Called by the frontend via api filtering on a given region.  
Holds just enough information to render the simpler single-region view.  
(difficulty reading this file from backend code if it lived in `/static`)

> A long long time ago...  
- Database pre-population was a pre-req
- Universe view took 20+ seconds render with calls against the database

