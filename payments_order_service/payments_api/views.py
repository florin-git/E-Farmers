from errno import ESTALE
from .models import *
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, NotAcceptable
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.views import TokenRefreshView

class OrdersView(viewsets.ViewSet):
    def save_order(self, request,id = None):  # POST /api/orders/<int:id>/
                print("PORCO IL DIO")
                
                """order_serializer = OrderSerializer( data = { "external_key_user": user_id} )
                if order_serializer.is_valid(raise_exception=True):
                    
                    order_serializer.save(ext_user = user)

                    return Response(serializer.data, status=status.HTTP_201_CREATED)   
                """
                order_serializer = OrderSerializer(data = request.data)
                if order_serializer.is_valid(raise_exception=True):
                    order_serializer.save()
                    return Response(order_serializer.data, status=status.HTTP_201_CREATED)
