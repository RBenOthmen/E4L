from email.mime import application
import os
from channels.auth import AuthMiddlewareStack
import chat.routing
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'englishforlazy.settings')

# application = get_asgi_application()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # wrap the urls in AuthMiddlewareStack so we can utilize authentification
    'websocket' : AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    )
}) 