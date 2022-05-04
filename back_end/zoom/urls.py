from django.urls import path
from . import views

urlpatterns = [
    path('createMeeting/', views.createMeeting, name='create_meeting'),
    path('createSignature/', views.createSignature, name='create_signature'),
]