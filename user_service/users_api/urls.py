from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/verify/', TokenVerifyView.as_view(), name="token_verify"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name="blacklist"),


    # Users
    path('users/', UsersView.as_view({
        'get': 'list_users',
        'post': 'register_user',
    })),
    path('users/<int:user_id>/', UsersView.as_view({
        'get': 'user_info',
        # 'post': '',
    })),
]