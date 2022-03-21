from re import A
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ADMIN_CHOICE='A'
    TEACHER_CHOICE='T'
    STUDENT_CHOICE='S'
    TASKMANAGER_CHOICE='TM'
    ROLE_CHOICES = [
        (ADMIN_CHOICE, 'Admin'),
        (TEACHER_CHOICE, 'Teacher'),
        (STUDENT_CHOICE, 'Student'),
        (TASKMANAGER_CHOICE, 'TaskManager'),
    ]
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255)
    birth_date = models.DateField()
    role = models.CharField(
        max_length=2, choices=ROLE_CHOICES)