import json
from pathlib import Path

from django import template
from django.conf import settings as django_settings
from django.utils.safestring import mark_safe

from evemap import app_settings as settings

register = template.Library()


def load_json_from_dist(json_filename="manifest.json"):
    manifest_file_path = Path(str(settings.VITE_APP_DIR), ".vite", json_filename)
    if not manifest_file_path.exists():
        raise Exception(
            f"Vite manifest file not found on path: {str(manifest_file_path)}"
        )
    else:
        with open(manifest_file_path, "r") as manifest_file:
            try:
                manifest = json.load(manifest_file)
            except Exception:
                raise Exception(
                    f"Vite manifest file invalid. Maybe your {str(manifest_file_path)} file is empty?"
                )
            else:
                return manifest


@register.simple_tag
def render_vite_bundle():
    """
    For production env, reads and returns the static build files.
    For dev, local frontend server needs to be running.
    """
    if django_settings.DEBUG:
        return

    manifest = load_json_from_dist()
    entry = manifest["index.html"]

    css_links = ""
    for css_file in entry.get("css", []):
        css_links += f'<link rel="stylesheet" type="text/css" href="/{settings.STATIC_URL}/{css_file}" />\n'

    js_script = (
        f'<script type="module" src="/{settings.STATIC_URL}/{entry["file"]}"></script>'
    )

    return mark_safe(f"{css_links}{js_script}")


@register.simple_tag
def get_debug():
    return django_settings.DEBUG
