from unicodedata import name
from django.db import router
from django.urls import path, re_path
from rest_framework.routers import SimpleRouter , DefaultRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('create',views.CustomCreateUserViewSet, basename='create') #localhost;8000/core/users GET
router.register('users',views.CustomUserViewSet, basename='users') #localhost;8000/core/users GET
router.register('teachers',views.TeacherViewSet, basename='teacher') #localhost/core/teachers
router.register('students',views.StudentViewSet, basename='student') #localhost/core/students

urlpatterns = [
    re_path(r"^jwt/create/?", views.CustomTokenObtainPairView.as_view(), name="jwt-custom-create"),
] + router.urls


