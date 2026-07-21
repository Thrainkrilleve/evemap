"""Generate and cache Eve Map geospatial GeoJSON files."""

import json
from pathlib import Path

from django.core.management.base import BaseCommand

from evemap.utils.geospatial import Geospatial
from evemap import app_settings as settings


class Command(BaseCommand):
    help = "Regenerate Eve Map GeoJSON cache files."

    def handle(self, *args, **options):
        output_dir = Path(settings.BASE_DIR, "static", "evemap", "geospatial")
        output_dir.mkdir(parents=True, exist_ok=True)
        data_dir = Path(settings.BASE_DIR, "data")
        data_dir.mkdir(parents=True, exist_ok=True)

        layers = ["solar_systems", "stargates_lines", "region_stargates_lines"]
        for layer in layers:
            self.stdout.write(f"Generating {layer}...")
            data = Geospatial.layer(layer)
            path = output_dir / f"{layer}.geojson"
            with path.open("w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

        self.stdout.write("Generating regions...")
        regions_data = Geospatial.regions()
        regions_path = data_dir / "regions.geojson"
        with regions_path.open("w", encoding="utf-8") as f:
            json.dump(regions_data, f, ensure_ascii=False, indent=2)

        self.stdout.write(self.style.SUCCESS("Geospatial cache regenerated."))
