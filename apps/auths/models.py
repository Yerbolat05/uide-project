from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)
from django.utils import timezone
from django.db import models
from django.db.models import QuerySet
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError

from abstracts.models import AbstractDateTime


class CustomUserManager(BaseUserManager):

    def create_user(
        self,
        city: str,
        email: str,
        phone: str,
        password: str
    ) -> 'CustomUser':

        if not email:
            raise ValidationError('Email required')

        user: 'CustomUser' = self.model(
            city=city,
            email=self.normalize_email(email),
            phone=phone,
            password=password
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email: str,
        password: str
    ) -> 'CustomUser':

        user: 'CustomUser' = self.model(
            email=self.normalize_email(email),
            password=password
        )
        user.is_stuff = True
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def get_not_deleted(self) -> QuerySet['CustomUser']:
        return self.filter(
            datetime_deleted__isnull=True
        )

    def get_deleted(self) -> QuerySet['CustomUser']:
        return self.filter(
            datetime_deleted_isnull=False
        )

class CustomUser(
    AbstractBaseUser,
    PermissionsMixin,
    AbstractDateTime
):
    city = models.CharField(
        'Город',
        max_length=9,
        default='Караганда'
    )
    email = models.EmailField(
        'Почта/Логин',
        unique=True
    )
    phone = models.CharField(
        'Номер телефона',
        max_length=12,
        default='87765372121'
    )
    is_active = models.BooleanField('Активность',default=True)
    is_staff = models.BooleanField('Статус менеджера',default=True)
    date_joined = models.DateTimeField(
        'Дата регистрации',default=timezone.now
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        ordering = (
            'date_joined',
        )
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'