from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('<str:room_name>/', views.room, name='room'),
    path('createchat/', views.createNewChatView, name='create_chat'),
    path('getallmessages/', views.getChatView, name='get_messages'),
]