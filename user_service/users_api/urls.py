from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('login/', LoginView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('oauth/token/', OAuthTokenObtainPairView.as_view(), name='google_token_obtain_pair'),
    
    
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
    path('users/<int:user_id>/changes/', UsersView.as_view({
        'patch' : 'change_profile',
    })),
    path('users/<int:user_id>/', UsersView.as_view({
        'get': 'user_info',
        'patch' : 'account_change',
    })),
    path('users/<int:user_id>/name/', UsersView.as_view({
        'get': 'user_name',
    })),
    path('users/<int:user_id>/<int:type>/' , UsersView.as_view({
        'post' : 'user_update',
    })),
    path('farmers/<int:user_id>/' , UsersView.as_view({
        'get'  : 'get_farmer',
        'patch': 'increase_number_insertions',
    })),
    path('riders/', UsersView.as_view({
        'get' : 'get_first_rider',
    })),
    path('riders/<int:user_id>/' , UsersView.as_view({
        'get' : 'get_rider',
        'patch' : 'change_status',
    })),
    path('review/<int:user_id>/' , UsersView.as_view({
        'get'  : 'retrieve_review',
        'post' : 'add_review',
    })),
    
]