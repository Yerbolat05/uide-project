from rest_framework.serializers import (
    ModelSerializer,
    IntegerField,
    ImageField,
    CharField,
    DateTimeField,
    SerializerMethodField,
)

from flat.models import (
    Amenities,
    Building,
)


class BuildingSerializer(ModelSerializer):
    """Building serializer."""

    # id = IntegerField(read_only=True)
    # image = ImageField()
    # name = CharField(read_only=True)

    # range = CharField(read_only=True)
    # flat_count = IntegerField()
    # floor = IntegerField()

    # bed_count = IntegerField()
    # balcony_count = IntegerField()
    # bathroom_count = IntegerField()

    # landmark = CharField(read_only=True)
    # description = DescriptionSerializer(
    #     required=True
    # )
    # city = CharField()
    # price = IntegerField()
    # datetime_created = DateTimeField(read_only=True)
    # datetime_updated = DateTimeField(read_only=True)
    # datetime_deleted = DateTimeField(read_only=True)

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
            'price',
            'number',
            'datetime_created',
            'datetime_updated',
            'datetime_deleted'
        )

    def get_name(self, obj: Building) -> str:
        return f'{obj.image} | {obj.name}'


