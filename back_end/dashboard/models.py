from django.conf import settings
from django.db import models

class Eleve (models.Model):
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Professeur (models.Model):
    prenom = models.CharField(max_length=255)
    nom = models.CharField(max_length=255)
    telephone = models.CharField(max_length=255)
    date_naissance = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)
    
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
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    category = models.CharField(
        max_length=2, choices=CATEGORY_CHOICES)

