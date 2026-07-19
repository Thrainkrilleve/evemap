# Development

## Backend
http://auth.localhost:8000/evemap/api/docs#/

## Frontend

```bash
pnpm run dev
```

Openlayers is employed to render geospatial vector data generated from raw xyz coords.  
- Interaction with the map is going to be event-centric  
- Re-rendering the UI from a Django template to load more information is not practical  
- Using xhr and string concatenation to manipulate content, whilst possible will turn to spaghetti almost immediately  

It was a complex mess to setup, _hopefully_ the trade-off is it ends up being less of a mess to maintain.  
That being said the instructions to spin this up are relatively painless.

### Installation

**[pnpm](https://pnpm.io/installation)** - the package manager
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**Node** - versions of this can be efficiently managed with pnpm
```bash
pnpm env use --global latest
```

**Light it up**
```bash
pnpm run dev
```

---

### Additional Information

The main complexities were: 
- `evemap/templatetags`  
Bubbles the `AA_DEBUG` .env var to the template so it can decide to read from the local UI server configured in `frontend/package.json`  
Loads the static files from `evemap/static/evemap/frontend` for production  
- `frontend/src/main.tsx`  
Needed configured with the shadow-dom to properly isolate app.    