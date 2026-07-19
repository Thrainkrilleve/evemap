from django.apps import AppConfig

from . import __title__, __version__


class EveMapConfig(AppConfig):
    name = "evemap"
    label = "evemap"
    verbose_name = f"{__title__} v{__version__}"
