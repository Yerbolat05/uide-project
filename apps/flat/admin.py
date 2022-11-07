from typing import Optional

from django.core.handlers.wsgi import WSGIRequest
from django.contrib import admin

from flat.models import (
    Building,
    Amenities,
)


class RentRangeAdmin(admin.ModelAdmin):

    readonly_fields = ()


class BuildingAdmin(admin.ModelAdmin):

    readonly_admin = ()


class AmenitiesAdmin(admin.ModelAdmin):

    readonly_fields = ()


admin.site.register(Building,BuildingAdmin)
admin.site.register(Amenities,AmenitiesAdmin)