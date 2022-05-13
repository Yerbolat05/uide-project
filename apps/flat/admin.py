from typing import Optional

from django.core.handlers.wsgi import WSGIRequest
from django.contrib import admin

from flat.models import (
    Description,
    Building,
    Amenities,
)

class RentRangeAdmin(admin.ModelAdmin):

    readonly_fields = ()


class DescriptionAdmin(admin.ModelAdmin):

    readonly_fields = ()


class BuildingAdmin(admin.ModelAdmin):

    readonly_admin = ()


class AmenitiesAdmin(admin.ModelAdmin):

    readonly_fields = ()


admin.site.register(Description,DescriptionAdmin)
admin.site.register(Building,BuildingAdmin)
admin.site.register(Amenities,AmenitiesAdmin)