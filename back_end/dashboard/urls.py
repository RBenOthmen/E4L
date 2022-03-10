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

eleves_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
eleves_router.register('lessons', views.LessonEleveViewSet, basename='eleve-lessons')


urlpatterns = router.urls + eleves_router.urls


