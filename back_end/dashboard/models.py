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
    linkedIn = models.CharField(max_length=255, default='linkedIn')
    video = models.FileField(
        upload_to = 'videos',
        null = True)

    # review = models.ForeignKey(Review, on_delete=models.PROTECT, related_name='reviews')

class Review (models.Model):
    RATE_CHOICES = [
        (0, '0'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]
    # professeur = models.ForeignKey(
    #     'Professeur', on_delete=models.CASCADE, null=True, related_name='+', blank=True)
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    rate = models.IntegerField(choices=RATE_CHOICES)



    # def num_rating(self):
    #     ratings = Review.objects.filter(professeur=self)
    #     return len(ratings)

    # def avg_rating(self):
    #     sum= 0
    #     ratings = Review.objects.filter(professeur=self)
    #     for rating in ratings:
    #         sum += rating.rate

    #     if len(ratings) > 0:
    #         return sum / len(ratings)
    #     else:
    #         return 0

class Task (models.Model):
    title = models.CharField(max_length=255)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField()
    is_completed = models.BooleanField(default=False)
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)


class Progress (models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    progression = models.PositiveIntegerField()

class EleveImage(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name = 'images')
    image = models.ImageField(
        upload_to = 'store/images',
        validators=[validate_file_size])

class Meeting (models.Model):
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE, null=True)
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, null=True)
    start = models.DateTimeField()
    color = models.CharField(max_length=255)
    title = models.CharField(max_length=255, null=True)

class Meet (models.Model):
    PENDING_CHOICE='P'
    REFUSED_CHOICE='R'
    ACCEPTED_CHOICE='A'

    STATUS_CHOICES = [
        (PENDING_CHOICE, 'Pending'),
        (REFUSED_CHOICE, 'Refused'),
        (ACCEPTED_CHOICE, 'Accepted'),

    ]
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, related_name='organizer')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, related_name='recipient')
    start = models.DateTimeField()
    title = models.CharField(max_length=255, null=True)
    username_organizer = models.CharField(max_length=255, null=True)
    username_recipient = models.CharField(max_length=255, null=True)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default='P')
    meetingNumber = models.CharField(max_length=255, null=True)
    password = models.CharField(max_length=255, null=True)



class Comment (models.Model):

    task_manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='commenter')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
    state = models.BooleanField(default=False)