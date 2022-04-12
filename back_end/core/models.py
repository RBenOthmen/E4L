from re import A
from django.db import models
from django.apps import apps
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser , BaseUserManager

from dashboard.validators import validate_file_size
# from rest_framework_simplejwt.tokens import RefreshToken

# def _create_user(self, username, email, password, **extra_fields):
#         """
#         Create and save a user with the given username, email, and password.
#         """
#         if not username:
#             raise ValueError("The given username must be set")
#         email = self.normalize_email(email)
#         # Lookup the real model class from the global app registry so this
#         # manager method can be used in migrations. This is fine because
#         # managers are by definition working on the real model.
#         GlobalUserModel = apps.get_model(
#             self.model._meta.app_label, self.model._meta.object_name
#         )
#         username = GlobalUserModel.normalize_username(username)
#         user = self.model(username=username, email=email, **extra_fields)
#         user.password = make_password(password)
#         user.save(using=self._db)
#         token = RefreshToken.for_user(user).access_token
#         return user

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
    birth_date = models.DateField(null=True)
    role = models.CharField(
        max_length=2, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to = 'store/images',
        validators=[validate_file_size],
        null = True)
