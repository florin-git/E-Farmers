from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # The refresh api will also return a new refresh token, since the previous
    # one is blacklisted
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', CustomTokenVerifyView.as_view(), name="token_verify"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name="blacklist"),

    # Users
    path('users/', UsersView.as_view({
        'get': 'list_users',
        'post': 'register_user',
    })),    
    path('users/<int:user_id>/', UsersView.as_view({
        'get': 'user_info',
    })),
]