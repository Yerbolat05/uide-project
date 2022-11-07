from typing import Optional
from datetime import datetime
from urllib import response

from rest_framework import permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response as DRF_Response
from rest_framework.request import Request as DRF_Request

from django.db.models import QuerySet

from abstracts.paginators import (
    AbstractPageNumberPaginator,
    AbstractLimitOffsetPaginator
)
from flat.models import Building
from flat.serializers import (
    BuildingSerializer,
)
from flat.permissions import (
    BuildingPermission,
)


class BuildingViewSet(ViewSet):
    """VIEWSET for Building"""

    permissions_classes: tuple = (
        BuildingPermission,
    )

    queryset: QuerySet[Building] = \
        Building.objects.get_not_deleted()

    serializer_class: BuildingSerializer = \
        BuildingSerializer

    pagination_class: AbstractPageNumberPaginator = \
        AbstractPageNumberPaginator

    def get_queryset(self) -> QuerySet[Building]:
        return self.queryset.select_related(
            
        )

    @action(
        methods=['get'],
        detail=False,
        url_path='list-2',
        permissions_classes=(
            permissions.AllowAny,
        )
    )

    def list_2(
        self,
        request: DRF_Request
    ) -> DRF_Response:
        """Handles POST-request to show custom-info about custom_users."""

        paginator: AbstractLimitOffsetPaginator = \
            AbstractLimitOffsetPaginator()

        objects: list = paginator.paginate_queryset(
            self.get_queryset(),
            request
        )

        serializer: BuildingSerializer = \
            self.serializer_class(
                objects,
                many=True
            )

        response: DRF_Response = \
            paginator.get_paginated_response(
                serializer.data
            )
        
        return response

    def list(
        self,
        request: DRF_Request
    ) -> DRF_Response:
        """Handles GET-request to show custom_users."""

        paginator: AbstractPageNumberPaginator = \
            self.pagination_class()

        paginator.page_size = 4

        response = self.custom_list(self.get_queryset(), paginator, request)
        return response

    def custom_list(
        self,
        queryset,
        paginator,
        request
    ) -> DRF_Response:
        objects: list = paginator.paginate_queryset(
            queryset,
            request
        )

        serializer: BuildingSerializer = \
            self.serializer_class(
                objects,
                many=True
            )
        response: DRF_Response = \
            paginator.get_paginated_response(
                serializer.data
            )
        return response

    @action(
        methods=['get'],
        detail=False,
        permissions_classes=(
            permissions.AllowAny,
        )
    )
    def list_3(
        self,
        request: DRF_Request
    ) -> DRF_Response:
        """Handles GET-request to show custom_users."""

        paginator: AbstractPageNumberPaginator = \
            self.pagination_class()

        paginator.page_size = 10

        response = self.custom_list(self.get_queryset(), paginator, request)
        return response

    def create(
        self,
        request: DRF_Request
    ) -> DRF_Response:
        """Handles POST-request to show custom_users."""
        serializer: BuildingSerializer = \
            BuildingSerializer(
                data=request.data
            )
        print(f'XXXXXXXXXXXXXXXXXXXXXX: {request.data}')
        if serializer.is_valid():
            print('OOK')
            serializer.save()
            return DRF_Response(
                {'data' : f'Обьект {serializer.id} создан'}
            )
        print(f'!!!!!!!!!!! ERRORS: {serializer.errors}')
        return DRF_Response(
            {'response': 'Обьект не создан'}   
        )

    def retrieve(
        self,
        request: DRF_Request,
        pk: int = 0
    ) -> DRF_Response:
        """Handles GET-request with ID to show custom_user."""

        custom_user: Optional[Building] = None
        try: 
            custom_user = self.get_queryset().get(
                id=pk
            )

        except Building.DoesNotExist:
            return DRF_Response(
                {'response': 'Не нашел такого юзера'}
            )

        serializer: BuildingSerializer = \
            BuildingSerializer(
                custom_user
            )

        return DRF_Response(
            {'response': serializer.data}
        )

    def partial_update(
        self,
        request: DRF_Request,
        pk: int = 0
    ) -> DRF_Response:
        """Handles PATCH-request with ID to show custom_user."""

        return DRF_Response(
            {'response': 'Метод partial_update'}
        )

    def update(
        self,
        request: DRF_Request
    ) -> DRF_Response:
        """Handles PUT-request with ID to show custom_user."""

        return DRF_Response(
            {'response':'Метод update'}
        )

    def destroy(
        self,
        request: DRF_Request,
        pk: int = 0
    ) -> DRF_Response:
        """Handles DELETE-request with ID to show custom_user."""

        building: Optional[Building] = None
        try:
            building = self.get_queryset().get(
                id=pk
            )
        except Building.DoesNotExist:
            return DRF_Response(
                {'data': f'Обьект с ID: {pk} не найден'}
            )

        building.datetime_deleted = datetime.now()
        building.save(
            update_fields=['datetime_deleted']
        )
        return DRF_Response(
            {'data': f'Обьект {building.id} удален'}
        )