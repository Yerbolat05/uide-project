"""uide URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from typing import Any

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from auths.views import CustomUserViewSet
from flat.views import BuildingViewSet

urlpatterns = [
    path(settings.ADMIN_SITE_URLS, admin.site.urls),
]+static(
    settings.STATIC_URL,
    document_root = settings.STATIC_ROOT
)+static(
    settings.MEDIA_URL,
    document_root = settings.MEDIA_ROOT
)
if settings.DEBUG:
    urlpatterns += [
        path('__debug__/',include('debug_toolbar.urls'))
    ]




# -----------------------------------------------------
# API-Endpoints
#
app_name = 'router'

router: DefaultRouter = DefaultRouter(
    trailing_slash=False
)
router.register('auths',CustomUserViewSet)
router.register('building',BuildingViewSet)
urlpatterns += [
    path(
        'api/v1/',
        include((router.urls, app_name), namespace='v1')
    ),
    path(
        'api/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path('api/token/refresh/',
        TokenRefreshView.as_view(), 
        name='token_refresh'
    ),
    path(
        'api/token/verify/',
        TokenVerifyView.as_view(),
        name='token_verify'
    ),
]