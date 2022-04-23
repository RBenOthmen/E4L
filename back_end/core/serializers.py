
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer , TokenCreateSerializer as BaseTokenCreateSerializer

from rest_framework import serializers

from django.db import IntegrityError, transaction

from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(BaseUserCreateSerializer):

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'birth_date', 'image']


    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)

            user.is_active = True
            user.save(update_fields=["is_active"])
        return user


class UserSerializer(BaseUserSerializer):
    
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone', 'birth_date', 'image']





