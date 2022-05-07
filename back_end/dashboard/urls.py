from cgitb import lookup
from posixpath import basename
from unicodedata import name
from django.db import router
from django.urls import path
from rest_framework.routers import SimpleRouter , DefaultRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('eleves',views.EleveViewSet, basename='eleves')
router.register('professeurs',views.ProfesseurViewSet, basename='professeurs')
router.register('lessons',views.LessonViewSet)
router.register('progress',views.ProgressViewSet)
router.register('meets',views.MeetViewSet)
router.register('reviews',views.ReviewViewSet)
router.register('comments',views.CommentViewSet)



#eleve router changed to progress router
progress_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
progress_router.register('progress', views.ProgressEleveViewSet, basename='eleve-progress')

tasks_router = routers.NestedDefaultRouter(router, 'professeurs', lookup='professeur')
tasks_router.register('tasks', views.TaskProfesseurViewSet, basename='professeur-task')

image_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
image_router.register('images', views.EleveImageViewSet, basename='eleve_images')

mettingsStudent_router = routers.NestedDefaultRouter(router, 'eleves', lookup='eleve')
mettingsStudent_router.register('meetings', views.MeetingStudentViewSet, basename='student-meetings')

mettingTeacher_router = routers.NestedDefaultRouter(router, 'professeurs', lookup='professeur')
mettingTeacher_router.register('meetings', views.MeetingTeacherViewSet, basename='teacher-meetings')

urlpatterns = [
    path('teacherinfo/<int:id>/', views.TeacherInfo, name='teacherinfo'),
    path('studentinfo/<int:id>/', views.StudentInfo, name='studentinfo'),
    path('meetings/<int:id>/', views.Meetings, name='meetings'),
    path('getallmeets/<int:id>/', views.getMeetView, name='get_meets'),
    path('getstudentreview/', views.rate_review, name='get_review'),
    path('getcomments/', views.get_comments, name='get_comments'),
    path('getusercomments/<int:id>/', views.get_comments_to_admin, name='get_comments_to_admin'),
] + router.urls + progress_router.urls + tasks_router.urls + image_router.urls + mettingTeacher_router.urls + mettingsStudent_router.urls


