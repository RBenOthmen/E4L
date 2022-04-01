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

#eleve router changed to progress router
progress_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
progress_router.register('progress', views.ProgressEleveViewSet, basename='eleve-progress')

tasks_router = routers.NestedDefaultRouter(router, 'professeurs', lookup='professeur')
tasks_router.register('tasks', views.TaskProfesseurViewSet, basename='professeur-task')

image_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
image_router.register('images', views.EleveImageViewSet, basename='eleve_images')

urlpatterns = router.urls + progress_router.urls + tasks_router.urls + image_router.urls


