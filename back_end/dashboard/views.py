from multiprocessing import context
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from .serializers import EleveSerializer, LessonSerializer, MeetingStudentSerializer, MeetingTeacherSerializer,ProfesseurSerializer, ProgressEleveSerializer, ProgressSerializer, EleveImageSerializer, TaskSerializer
from dashboard import serializers
from .models import Eleve, Lesson, Meeting, Professeur, Progress, EleveImage ,Task
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view,action
from django.contrib.auth import get_user_model

User = get_user_model()

#class EleveViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
class EleveViewSet(ModelViewSet):
    # queryset = Eleve.objects.all()
    serializer_class = EleveSerializer

    def get_queryset(self ):     
        return Eleve.objects.select_related('user').all()

    @action(detail=False, methods=['GET','PUT'])
    def me(self, request):
        (eleve, created) = Eleve.objects.get_or_create(user_id=request.user.id)
        if request.method =='GET':
            serializer = EleveSerializer(eleve)
            return Response (serializer.data)
        elif request.method == 'PUT':
            serializer = EleveSerializer(eleve, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class ProfesseurViewSet(ModelViewSet):
    # queryset = Professeur.objects.all()
    serializer_class = ProfesseurSerializer

    def get_queryset(self ):     
        return Professeur.objects.select_related('user').all()

    @action(detail=False, methods=['GET','PUT'])
    def me(self, request):
        (professeur, created) = Professeur.objects.get_or_create(user_id=request.user.id)
        if request.method =='GET':
            serializer = ProfesseurSerializer(professeur)
            return Response (serializer.data)
        elif request.method == 'PUT':
            serializer = ProfesseurSerializer(professeur, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class ProgressViewSet(ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer


    

class LessonViewSet(ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class ProgressEleveViewSet(ModelViewSet):

    serializer_class = ProgressEleveSerializer

    def get_queryset(self, ):
        return Progress.objects.filter(eleve_id=self.kwargs['eleve_pk'])

    def get_serializer_context(self):
        return {'eleve_id':self.kwargs['eleve_pk']}

class TaskProfesseurViewSet(ModelViewSet):
    
    serializer_class = TaskSerializer


    def get_queryset(self, ):     
        return Task.objects.filter(professeur_id=self.kwargs['professeur_pk'])

    def get_serializer_context(self):
        return {'professeur_id':self.kwargs['professeur_pk']}


class EleveImageViewSet(ModelViewSet):
    serializer_class = EleveImageSerializer

    def get_serializer_context(self):
        return {'eleve_id': self.kwargs['eleve_pk']}

    def get_queryset(self):
        return EleveImage.objects.filter(eleve_id = self.kwargs['eleve_pk'])


class MeetingStudentViewSet(ModelViewSet):
    serializer_class = MeetingStudentSerializer

    def get_serializer_context(self):
        return {'eleve_id': self.kwargs['eleve_pk']}

    def get_queryset(self):
        return Meeting.objects.filter(eleve_id = self.kwargs['eleve_pk'])

class MeetingTeacherViewSet(ModelViewSet):
    serializer_class = MeetingTeacherSerializer

    def get_serializer_context(self):
        return {'professeur_id': self.kwargs['professeur_pk']}

    def get_queryset(self):
        return Meeting.objects.filter(professeur_id = self.kwargs['professeur_pk'])

@api_view(['GET'])
def TeacherInfo(request, id):
        user = get_object_or_404(Professeur , user_id=id)
        serializer = ProfesseurSerializer(data=request.data)
        return Response(serializer.data)

@api_view(['GET'])
def StudentInfo(request, id):
        student = get_object_or_404(Eleve , user_id=id)
        serializer = EleveSerializer(student)
        return Response(serializer.data)




    
@api_view(['GET'])
def Meetings(request, id):
    if request.method == "GET":
        user = get_object_or_404(User , pk=id)
        print(user)
# filter(Q(receiver__id=receiverid, sender__id=senderid) | Q(receiver__id=senderid, sender__id=receiverid))
        queryset = Meeting.objects.all()
        serializer = MeetingTeacherSerializer(queryset, many=True, context={
            'request':request
        })
        return Response(serializer.data)


