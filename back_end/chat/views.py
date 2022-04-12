from django.dispatch import receiver
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
import ast
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from chat.models import ChatView
from chat.serializers import ChatViewSerializer
from django.db.models import Q


def index(request):
    return render(request, 'index.html', {})

def room(request, room_name):
    return render(request, 'chatroom.html', {
        'room_name' : room_name
    })

@api_view(['POST'])
def createNewChatView(request):
    if request.method == "POST":
        querydictstr = request.body.decode('UTF-8') #si ona des caractere different
        querydict = ast.literal_eval(querydictstr)
        ChatView.create_chat(querydict['message'], querydict['sender_id'], querydict['receiver_id'])
        return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def getChatView(request):
    if request.method == "POST":
        senderid = request.data['sender_id']
        receiverid = request.data['receiver_id']
        queryset = ChatView.objects.filter(Q(receiver__id=receiverid, sender__id=senderid) | Q(receiver__id=senderid, sender__id=receiverid)).all()
        serializer = ChatViewSerializer(queryset, many=True, context={
            'request':request
        })
        return Response(serializer.data)
