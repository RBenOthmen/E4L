from multiprocessing import context
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from .serializers import EleveSerializer, LessonSerializer,ProfesseurSerializer, ProgressEleveSerializer, ProgressSerializer, EleveImageSerializer
from dashboard import serializers
from .models import Eleve, Lesson, Professeur, Progress, EleveImage
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view,action

#class EleveViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
class EleveViewSet(ModelViewSet):
    queryset = Eleve.objects.all()
    serializer_class = EleveSerializer

    @action(detail=False, methods=['GET','PUT'])
    def me(self, request):
        (customer, created) = Eleve.objects.get_or_create(user_id=request.user.id)
        if request.method =='GET':
            serializer = EleveSerializer(customer)
            return Response (serializer.data)
        elif request.method == 'PUT':
            serializer = EleveSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class ProfesseurViewSet(ModelViewSet):
    queryset = Professeur.objects.all()
    serializer_class = ProfesseurSerializer


class ProgressViewSet(ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

class ProgressEleveViewSet(ModelViewSet):

    serializer_class = ProgressEleveSerializer

    def get_queryset(self, ):
        return Progress.objects.filter(eleve_id=self.kwargs['eleve_pk'])

    def get_serializer_context(self):
        return {'eleve_id':self.kwargs['eleve_pk']}



class LessonViewSet(ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class EleveImageViewSet(ModelViewSet):
    serializer_class = EleveImageSerializer

    def get_serializer_context(self):
        return {'eleve_id': self.kwargs['eleve_pk']}

    def get_queryset(self):
        return EleveImage.objects.filter(eleve_id = self.kwargs['eleve_pk'])
