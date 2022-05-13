from rest_framework.serializers import (
    ModelSerializer,
    IntegerField,
    ImageField,
    CharField,
    DateTimeField,
    SerializerMethodField,
)
from flat.models import (
    Description,
    Amenities,
    Building,
)


class DescriptionSerializer(ModelSerializer):
    """Description serializer."""

    text = CharField(read_only=True)

    class Meta:
        model = Description
        fields = (
            'text',
        )


class BuildingSerializer(ModelSerializer):
    """Building serializer."""

    id = IntegerField(read_only=True)
    image = ImageField()
    name = CharField(read_only=True)

    range = CharField(read_only=True)
    flat_count = IntegerField()
    floor = IntegerField()

    bed_count = IntegerField()
    balcony_count = IntegerField()
    bathroom_count = IntegerField()

    landmark = CharField(read_only=True)
    description = DescriptionSerializer(
        required=True
    )
    city = CharField()

    datetime_created = DateTimeField(read_only=True)
    datetime_updated = DateTimeField(read_only=True)
    datetime_delted = DateTimeField(read_only=True)

    names = SerializerMethodField(
        method_name='get_name'
    )

    class Meta:
        model = Building
        fields = (
            'id',
            'image',
            'name',
            'range',
            'flat_count',
            'floor',
            'bed_count',
            'balcony_count',
            'bathroom_count',
            'landmark',
            'description',
            'city',
            'datetime_created',
            'datetime_updated',
            'datetime_delted',
            'names',
        )

    def get_name(self, obj: Building) -> int:
        return f'{obj.image} | {obj.name}'


