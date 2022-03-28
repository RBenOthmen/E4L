from cgitb import lookup
from posixpath import basename
from unicodedata import name
from django.db import router
from django.urls import path
from rest_framework.routers import SimpleRouter , DefaultRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('eleves',views.EleveViewSet)
router.register('professeurs',views.ProfesseurViewSet)
router.register('lessons',views.LessonViewSet)
router.register('progress',views.ProgressViewSet)

image_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
image_router.register('images', views.EleveImageViewSet, basename='eleve_images')

eleves_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
eleves_router.register('progress', views.ProgressEleveViewSet, basename='eleve-progress')


urlpatterns = router.urls + eleves_router.urls + image_router.urls


