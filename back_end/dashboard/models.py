from django.db import models

class Eleve (models.Model):
    prenom = models.CharField(max_length=255)
    nom = models.CharField(max_length=255)
    telephone = models.CharField(max_length=255)
    date_naissance = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)

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
        ('C1', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2')
    ]
    #localhost/lessons?eleve_id=pk
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    category = models.CharField(
        max_length=2, choices=CATEGORY_CHOICES)

