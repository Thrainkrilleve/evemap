"""App settings."""

import os
from pathlib import Path

from django.conf import settings

EXAMPLE_SETTING_ONE = getattr(settings, "EXAMPLE_SETTING_ONE", None)

# In production we should not expose debug information by default.
DEBUG = getattr(settings, "DEBUG", False)

BASE_DIR = Path(__file__).resolve().parent
VITE_APP_DIR = BASE_DIR / "static" / "evemap" / "frontend"
STATIC_URL = "static/evemap/frontend"
STATICFILES_DIRS = [
    str(VITE_APP_DIR / ".vite"),
]
