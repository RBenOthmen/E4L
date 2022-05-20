
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer , TokenCreateSerializer as BaseTokenCreateSerializer

from rest_framework import serializers

from django.db import IntegrityError, transaction

from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from core.models import Phone
from dashboard.models import Eleve, Professeur

User = get_user_model()

class PhoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Phone
        fields = ['id', 'country_code', 'number']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        if user.role == 'S':
            eleve = Eleve.objects.filter(user_id=user.id).get()
            id = eleve.id
        elif user.role == 'T':
            professeur = Professeur.objects.filter(user_id=user.id).get()
            id = professeur.id

        if id :
            token['id'] = id
        token['role'] = user.role
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['username'] = user.username
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        return token

class AdminUserCreateSerializer(BaseUserCreateSerializer):
    phone_id = serializers.IntegerField()
    # phone = PhoneSerializer()
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'role', 'birth_date', 'image', 'phone_id']


    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)

            user.is_active = True
            user.save(update_fields=["is_active"])
        return user

class UserCreateSerializer(BaseUserCreateSerializer):
    phone_id = serializers.IntegerField()
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'role', 'birth_date', 'image', 'phone_id']


class UserSerializer(BaseUserSerializer):
    phone_id = serializers.IntegerField()
    phone = PhoneSerializer()
    class Meta(BaseUserSerializer.Meta):
        fields = ['id',  'email', 'first_name', 'last_name', 'role', 'phone', 'birth_date', 'image', 'username', 'phone_id']





