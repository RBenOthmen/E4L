from unicodedata import name
from django.db import router
from django.urls import path
from rest_framework.routers import SimpleRouter , DefaultRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('users',views.UserViewSet)
router.register('teachers',views.TeacherViewSet, basename='teacher')


urlpatterns = router.urls 


