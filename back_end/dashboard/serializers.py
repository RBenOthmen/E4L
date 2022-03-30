import collections
from dataclasses import field
from decimal import Decimal
import email
from itertools import product
from rest_framework import serializers

from dashboard.models import Eleve, Lesson, Professeur, Progress, Task


class ProfesseurSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    class Meta:
        model = Professeur
        fields  = ['id', 'user_id']

class LessonSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Lesson
        fields =['id', 'title', 'category']

class ProgressSerializer(serializers.ModelSerializer):
    eleve_id = serializers.IntegerField()
    lesson_id = serializers.IntegerField()
    class Meta:
        model = Progress
        fields =['id', 'progression', 'eleve_id', 'lesson_id']


class EleveSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Eleve
        fields = ['id', 'user_id']

class ProgressEleveSerializer(serializers.ModelSerializer):
    lesson_id = serializers.IntegerField()
    class Meta:
        model = Progress
        fields =['id', 'progression', 'lesson_id']

    def create(self, validated_data):
        eleve_id = self.context['eleve_id']
        return Progress.objects.create(eleve_id , **validated_data)

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields =['id', 'title', 'date', 'is_completed']

    def create(self, validated_data):
        professeur_id = self.context['professeur_id']
        
        return Task.objects.create(professeur_id , **validated_data)    

        # example_relationship = validated_data.pop('example_relationship')
        #     instance = ExampleModel.objects.create(**validated_data)
        #     instance.example_relationship = example_relationship
        #     return instance





    
    

