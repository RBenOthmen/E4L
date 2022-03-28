from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializers
from .models import Task

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializers
    queryset = Task.objects.all()