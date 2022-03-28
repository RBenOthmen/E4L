from django.db import models
from django.db.models.fields import DateTimeField
from django.utils import timezone

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    startTime = models.DateTimeField(null=True, blank=True)
    endTime = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(editable=False, auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title