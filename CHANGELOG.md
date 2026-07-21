# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.0.3] - 2026-07-21

### Fixed

- Removed the obsolete `{% load bootstrap %}` template tag import that caused `/evemap/` to fail under current AllianceAuth template libraries.

## [0.0.2] - 2026-07-21

### Fixed

- Removed the obsolete `csrf` argument from `NinjaAPI(...)` for compatibility with current `django-ninja` releases.

## [0.0.1] - 2026-07-21

### Changed

- Relaxed `django-eveuniverse` dependency to `>=2,<3` to avoid downgrading AllianceAuth app dependencies during installation.
- Relaxed `django-ninja` dependency to `>=1.5,<2` to stay compatible with current AllianceAuth app requirements.

## [0.0.0b5] - 2025-06-27

### Changed

- Fixed system names on Region View

## [0.0.0b4] - 2025-06-27

### Added
- React to manage the map
- REST api
- Spatial data as static files, so each administrator doesn't have to pre-populate the database with the entire universe

## [0.0.0b3] - 2025-06-11

### Added

- Geospatial layer for region boundaries
- Geospatial layer for constellation boundaries
- Geospatial layer for gate network as linestrings
- Text labels
- Layer switcher

### Changed

- Spatial data cached in static files
- No longer need to pre-populate database map data from esi
- Readme installation instructions updated
