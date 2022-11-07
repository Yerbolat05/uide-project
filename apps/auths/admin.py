from typing import Optional

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.handlers.wsgi import WSGIRequest

from auths.models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = (
        ('Information', {
            'fields': (
                'city',
                'email',
                'phone',
                'password',
                'date_joined',
            )
        }),
        ('Permissions', {
            'fields': (
                'is_superuser',
                'is_staff',
                'is_active',
            )
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': (
                'wide',
            ),
            'fields': (
                'city',
                'email',
                'phone',
                'password1',
                'password2',
                'is_active',
            ),
        }),
    )

    search_fields = (
        'email',
    )

    readonly_fields = (
        'date_joined',
        'is_superuser',
        'is_staff',
        'is_active',
    )

    list_display = (
        'city',
        'email',
        'phone',
        'password',
        'date_joined',
        'is_staff',
        'is_active',
    )

    list_filter = (
        'city',
        'email',
        'phone',
        'is_superuser',
        'is_staff',
        'is_active',
    )

    ordering = (
        'email',
    )

    def get_readonly_fields(
        self,
        request: WSGIRequest,
        obj: Optional[CustomUser] = None
    ) -> tuple:
        if not obj:
            return self.readonly_fields

        return self.readonly_fields + (
            'email',
        )

admin.site.register(
    CustomUser, CustomUserAdmin
)