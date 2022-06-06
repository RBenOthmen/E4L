from coreapi import Object
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from core.models import Phone
from core.serializers import AdminUserCreateSerializer, CustomTokenObtainPairSerializer, PhoneSerializer, UserCreateSerializer, UserSerializer, UserUpdateSerializer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from djoser.views import UserViewSet as BaseUserViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.settings import api_settings
from djoser.conf import settings
from djoser.compat import get_user_email
from djoser import signals
from djoser import views
from djoser.serializers import ActivationSerializer
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework_simplejwt import views
from djoser import views as djoserviews
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer
    token_obtain_pair = TokenObtainPairView.as_view()

@api_view(['POST'])
def activation(request, id):
        user = get_object_or_404(User , pk=id)
        serializer = UserSerializer(data=request.data)
        user = serializer.user
        user.is_active = True
        user.save()

class CustomCreateUserViewSet(ModelViewSet):  
    queryset = User.objects.all()
    # serializer_class = AdminUserCreateSerializer  

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AdminUserCreateSerializer
        elif self.request.method == 'PUT':
            return AdminUserCreateSerializer
        else :
            return UserSerializer 

class CustomUserViewSet(ModelViewSet):  
    # serializer_class = UserSerializer  
    queryset = User.objects.select_related('phone').all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AdminUserCreateSerializer
        elif self.request.method == 'PUT' and self.action =='accountUpdate':
            return UserUpdateSerializer
        elif self.request.method == 'PUT':
            return AdminUserCreateSerializer
        else :
            return UserSerializer 
    
    @action(detail=False, methods=['PUT'])
    def accountUpdate(self, request):
        print(request.user)
        print(request.user.id)
        user = User.objects.filter(pk=request.user.id).get()
        print('im here')
        if request.method == 'PUT':
            serializer = UserUpdateSerializer(user, data=request.data)
            print('im here 2')
            serializer.is_valid(raise_exception=True)
            print('im here 3')
            serializer.save()
            print('im here 4')
            return Response(serializer.data)




# class CustomUserViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserCreateSerializer
    # def create(self, request, *args, **kwargs):
    #     serializer = UserCreateSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     user_data = serializer.data
    #     user = User.objects.get(email=user_data['email'])
    #     refresh = RefreshToken.for_user(user)
    #     token2 = default_token_generator.make_token(user)
    #     #user_data['refresh'] = str(refresh)
    #     user_data['access'] = str(refresh.access_token)
    #     # print(token2)
    #     # newdict={'token':token2}
    #     # newdict.update(serializer.data)
    #     return Response(user_data, status=status.HTTP_201_CREATED, headers=headers)


    # def perform_create(self, serializer):
    #         user = serializer.save()
    #         signals.user_registered.send(
    #             sender=self.__class__, user=user, request=self.request
    #         )

    #         context = {"user": user}
    #         to = [get_user_email(user)]
    #         if settings.SEND_ACTIVATION_EMAIL:
    #             settings.EMAIL.activation(self.request, context).send(to)
    #         elif settings.SEND_CONFIRMATION_EMAIL:
    #             settings.EMAIL.confirmation(self.request, context).send(to)    


class TeacherViewSet(ModelViewSet):
   
    serializer_class = UserSerializer

    def get_queryset(self ):     
        return User.objects.filter(role="T")

class StudentViewSet(ModelViewSet):
   
    serializer_class = UserSerializer

    def get_queryset(self ):     
        return User.objects.filter(role="S")
    
    
class PhoneViewSet(ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer








