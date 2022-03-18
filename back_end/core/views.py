from django.shortcuts import render

from core.models import User
from core.serializers import UserSerializer
from rest_framework.viewsets import ModelViewSet, GenericViewSet

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeacherViewSet(ModelViewSet):
   
    serializer_class = UserSerializer

    def get_queryset(self ):     
        return User.objects.filter(role="T")