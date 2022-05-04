import collections
from dataclasses import field, fields
from decimal import Decimal
import email
from itertools import product

from rest_framework import serializers
from core.serializers import UserSerializer

from dashboard.models import Eleve, Lesson, Meet, Meeting, Professeur, Progress, Review, Task, EleveImage, Comment


class ProfesseurSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    user = UserSerializer()
    class Meta:
        model = Professeur
        fields  = ['id', 'user_id', 'user', 'num_rating', 'avg_rating']

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



class EleveImageSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        eleve_id = self.context['eleve_id']
        return EleveImage.objects.create(eleve_id=eleve_id, **validated_data)

    class Meta:
        model = EleveImage
        fields = ['id', 'image']

class ProgressEleveSerializer(serializers.ModelSerializer):
    lesson_id = serializers.IntegerField()
    class Meta:
        model = Progress
        fields =['id', 'progression', 'lesson_id']

    def create(self, validated_data):
        eleve_id = self.context['eleve_id']
        return Progress.objects.create(eleve_id=eleve_id , **validated_data)

class EleveSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    user_id = serializers.IntegerField()
    images = EleveImageSerializer(many=True, read_only=True)

    class Meta:
        model = Eleve
        fields = ['id', 'user_id', 'images', 'user']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields =['id', 'title', 'start_date' ,'end_date' , 'is_completed']

    def create(self, validated_data):
        professeur_id = self.context['professeur_id']
        
        return Task.objects.create(professeur_id=professeur_id , **validated_data)    

        # example_relationship = validated_data.pop('example_relationship')
        #     instance = ExampleModel.objects.create(**validated_data)
        #     instance.example_relationship = example_relationship
        #     return instance

class MeetingStudentSerializer(serializers.ModelSerializer):
    eleve_id = serializers.IntegerField()
    professeur_id = serializers.IntegerField()
    class Meta:
        model = Meeting
        fields =['id', 'start', 'title', 'color', 'professeur_id', 'eleve_id']

        def create(self, validated_data):
            eleve_id = self.context['eleve_id']
            return Meeting.objects.create(eleve_id=eleve_id , **validated_data)

class MeetingTeacherSerializer(serializers.ModelSerializer):
    eleve_id = serializers.IntegerField()
    professeur_id = serializers.IntegerField()
    class Meta:
        model = Meeting
        fields =['id', 'start', 'title', 'color', 'professeur_id', 'eleve_id']

        def create(self, validated_data):
            professeur_id = self.context['professeur_id']
            return Meeting.objects.create(professeur_id=professeur_id , **validated_data)

class MeetSerializer(serializers.ModelSerializer):
    organizer_id = serializers.IntegerField()
    recipient_id = serializers.IntegerField()
    class Meta:
        model = Meet
        fields =['id', 'start', 'title', 'color', 'recipient_id', 'organizer_id', 'status', 'username_organizer', 'username_recipient']



class ReviewSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    professeur_id = serializers.IntegerField()
    class Meta:
        model = Review
        fields =['id', 'created_at', 'rate', 'professeur_id', 'user_id']

class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    task_manager_id = serializers.IntegerField()
    class Meta:
        model = Comment
        fields =['id', 'task_manager_id', 'user_id', 'comment', 'created_at']

    
    

        
