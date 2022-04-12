import datetime

from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from englishforlazy import settings
from core.models import User


class ChatView(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, related_name='sender')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, related_name='receiver')
    sent_date = models.DateTimeField(auto_now=True)
    message = models.TextField()

    def _str_(self):
        return str(self.id)

    #create instance and save it in database
    def create_chat(message, senderid, receiverid):
        senderid = int(senderid)
        receiverid = int(receiverid)
        chatnew = ChatView(sender = get_object_or_404(User, id=senderid), receiver = get_object_or_404(User, id=receiverid), sent_date = datetime.datetime.now(), message=message)
        chatnew.save()

