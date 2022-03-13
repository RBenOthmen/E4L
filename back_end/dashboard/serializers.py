import collections
from dataclasses import field
from decimal import Decimal
import email
from itertools import product
from rest_framework import serializers

from dashboard.models import Eleve, Lesson, Professeur, Progress


class ProfesseurSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    class Meta:
        model = Professeur
        fields =fields = ['id', 'user_id', 'phone', 'birth_date', 'formation']

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

class ProgressEleveSerializer(serializers.ModelSerializer):
    lesson_id = serializers.IntegerField()
    class Meta:
        model = Progress
        fields =['id', 'progression', 'lesson_id']

    def create(self, validated_data):
        eleve_id = self.context['eleve_id']
        return Progress.create(eleve_id , **validated_data)

class EleveSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Eleve
        fields = ['id', 'user_id', 'phone', 'birth_date']





    
    

