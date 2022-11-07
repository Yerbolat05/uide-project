from django.contrib.auth.forms import (
    UserCreationForm,
    UserChangeForm,
)
from django import forms

from auths.models import CustomUser


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = (
            'email',
        )

    
class CustomUserChangeFrom(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = (
            'email',
        )


class CustomUserForm(forms.ModelForm):
    name = forms.CharField(
        label='Имя',
    )
    city = forms.CharField(
        label='Город'
    )
    email = forms.EmailField(
        label='Email'
    )
    phone = forms.CharField(
        label='Номер телефона'
    )
    password = forms.CharField(
        widget=forms.PasswordInput,
        label='Пароль'
    )

    class Meta:
        model = CustomUser
        fields = (
            'name',
            'city',
            'email',
            'phone',
            'password'
        )