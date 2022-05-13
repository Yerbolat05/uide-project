from ast import Mod
from datetime import datetime
from email.mime import image
from tabnanny import verbose
from turtle import update
from django.db.models import (
    Model,
    CharField,
    IntegerField,
    QuerySet,
    ImageField,
    TextField,
    ManyToManyField,
    OneToOneField,
    CASCADE,
)

from abstracts.models import AbstractDateTime


class Description(Model):
    """Description entity."""

    text = TextField(
        verbose_name='описание',
        default=''
    )

    def __str__(
        self
    ) -> str:
        return f'Описание: {self.text}'

    class Meta:
        ordering = (
            'text',
        )
        verbose_name='Описание'
        verbose_name_plural='Описаний'


class BuildingQuerySet(QuerySet):
    """Building queryset."""

    def get_deleted(self) -> QuerySet['Building']:
        return self.filter(
            datetime_delleted__isnull=False
        )

    def get_not_deleted(self) -> QuerySet['Building']:
        return self.filter(
            datetime_deleted__isnull=True
        )


class Building(AbstractDateTime):
    """Building entity."""

    image = ImageField(
        verbose_name='изображение'
    )

    name = CharField(
        verbose_name='текст',
        max_length=100
    )



    TOPIC_MAX_LENGTH = 20

    TOPIC_DAILY = 'посуточно'
    TOPIC_MONTHLY = 'помесячно'

    TOPIC_RANGE = (
        (TOPIC_DAILY,'Посуточно'),
        (TOPIC_MONTHLY,'Помесячно'),
    )

    range = CharField(
        verbose_name='аренда',
        max_length=TOPIC_MAX_LENGTH,
        choices=TOPIC_RANGE,
        default=TOPIC_DAILY,
        null=True
    )




    flat_count = IntegerField(
        verbose_name='количество комнат'
    )

    floor = IntegerField(
        verbose_name='этажность'
    )

    bed_count = IntegerField(
        verbose_name='спальные места'
    )

    balcony_count = IntegerField(
        verbose_name='балконы'
    )

    bathroom_count = IntegerField(
        verbose_name='ванные места'
    )

    landmark = CharField(
        verbose_name='рядом есть',
        max_length=50
    )

    description = OneToOneField(
        Description,
        verbose_name='описание',
        on_delete=CASCADE
    )

    city = CharField(
        verbose_name='город',
        max_length=50
    )

    objects = BuildingQuerySet().as_manager()

    def __str__(
        self
    ) -> str:
        return f'{self.name} | {self.range} | {self.flat_count} | {self.floor}'   

    def save(
        self,
        *args: tuple,
        **kwargs: dict
    ) -> None:
        super().save(*args,**kwargs)

    def delete(
        self
    ) -> None:
        self.datetime_deleted = datetime.now()
        self.save(
            update_field=['datetime_deleted']
        )

    class Meta:
        verbose_name='Аренда'
        verbose_name_plural='Аренды'


class Amenities(Model):
    """Amenities entity."""

    text = CharField(
        verbose_name='в квартире есть',
        max_length=50
    )

    building = ManyToManyField(
        Building,
        related_name='amenitieses',
        verbose_name='здание'
    )

    def __str__(
        self
    ) -> str:
        return f'Удобства: {self.text}'

    class Meta:
        ordering = (
            'text',
        )
        verbose_name = 'удобства'
        verbose_name_plural = 'удобствы'
