from django.conf import settings
from django.db import models
from core.models import User
from dashboard.validators import validate_file_size
from django.core.validators import MinValueValidator, FileExtensionValidator


class Eleve (models.Model):
    #phone = models.CharField(max_length=255)
    #birth_date = models.DateField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    #lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='eleves', null=True)

class Lesson (models.Model):
    CATEGORY_CHOICES = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2')
    ]
    #localhost/lessons?eleve_id=pk
    #eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='lessons', null=True)
    title = models.CharField(max_length=255)
    category = models.CharField(
        max_length=2, choices=CATEGORY_CHOICES)

class Professeur (models.Model):
    #phone = models.CharField(max_length=255)
    #birth_date = models.DateField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Progress (models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    progression = models.PositiveIntegerField()

class EleveImage(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name = 'images')
    image = models.ImageField(
        upload_to = 'store/images',
        validators=[validate_file_size])