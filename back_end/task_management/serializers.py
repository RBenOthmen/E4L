from django.db.models.fields import Field
from rest_framework import serializers
from .models import Task


class TaskSerializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "startTime", "endTime", "completed", "created_on", "updated_on")