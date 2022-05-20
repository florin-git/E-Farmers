from django.urls import path
from .views import *

urlpatterns = [
    # Insertions
    path('login/', AuthenticationView.as_view({
        # 'get': 'list_insertions',
        'post': 'login',
    })),
]