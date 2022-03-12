import collections
from dataclasses import field
from decimal import Decimal
import email
from itertools import product
from rest_framework import serializers

from dashboard.models import Eleve, Lesson, Professeur


class ProfesseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professeur
        fields =['id', 'nom', 'prenom', 'email', 'telephone', 'date_naissance']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields =['id', 'title', 'category']

    def create(self, validated_data):
        eleve_id = self.context['eleve_id']
        return Lesson.create(eleve_id , **validated_data)

class EleveSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Eleve
        fields = ['id', 'user_id', 'phone', 'birth_date']





    
    

