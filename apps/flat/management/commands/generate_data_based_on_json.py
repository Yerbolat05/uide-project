from typing import Optional
from datetime import datetime

from requests import get as r_get
from requests.models import Response

from django.core.management.base import BaseCommand

from flat.models import (
    Description,
    Building,
    Amenities,
)

class Command(BaseCommand):
    """Custom command for filling up database from JSON."""

    help = 'Custom command for filling up database from JSON.'

    def __init__(
        self,
        *args: tuple,
        **kwargs: dict
    ) -> None:
            pass

    def _generate_flat(
        self
    ) -> None:
        """Generates Flat objects."""

        flat_public_resource_url: str = \
            'https://raw.githubusercontent.com/keerthiga14/Appartment_booking_app/master/assets/data/records.json' #noqa

        response: Response = r_get(flat_public_resource_url)

        if response.status_code != 200:
            return None

        data: list = response.json()
        obj: dict
        for obj in data:
           
            description: Description
            created: bool
            description, created = \
                 Description.objects.get_or_create(
                    text=obj['description']
                )

            building: Building
            created: bool
            building, created = \
                Building.objects.get_or_create(
                    image=obj['productImagePath']['exteriorView'],
                    name=obj['buildingName'],
                    bed_count=obj['bedNo'],
                    balcony_count=obj['balconyNo'],
                    bathroom_count=obj['bathroomNo'],
                    landmark=obj['landmark'],
                    flat_count=obj['totalTenantsReq'],
                    floor=obj['cotNo'],
                    description=description,
                    city=obj['city'],
                )

            # Generate amenities
            amenities: str
            for amenities in obj['amenities']:
                text: str = amenities if amenities != '-' else 'Unknown'
                amenities: Amenities
                created: bool
                amenities, created = \
                    Amenities.objects.get_or_create(
                    text=text
                    )
                building.amenitieses.add(amenities)

    def handle(self, *args: tuple, **kwargs: dict) -> None:
        """Handles data filling."""

        start: datetime = datetime.now()

        self._generate_flat()

        print(
            'Generating Data: {} seconds'.format(
                (datetime.now()-start).total_seconds()
            )
        )