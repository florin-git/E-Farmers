from .models import *
from user_service.users_api.models import User
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, NotAcceptable
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenRefreshView

class CartView(viewsets):

    def cart_info(self, request, user_id=None):
        """
        Return the cart info
        """
        user = User.objects.get(id=user_id)
        
