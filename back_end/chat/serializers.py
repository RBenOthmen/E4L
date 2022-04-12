from rest_framework import serializers

from chat.models import ChatView

class ChatViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatView
        fields = ['id', 'sender', 'receiver', 'sent_date', 'message']