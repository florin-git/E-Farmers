from .models import *
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response

class CartView(viewsets.ViewSet):
    def create_cart(self, request, user_id=None): # POST /api/users/<int:user_id>/cart/
        serializer = CartSerializer(data={"user": user_id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    
    def cart_info(self, request, user_id=None): # GET /api/users/<int:user_id>/cart/        
        cart = Cart.objects.get(user=user_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def add_boxes(self, request, user_id=None): # PUT /api/users/<int:user_id>/cart/
        cart = Cart.objects.get(user=user_id)

        # instance and data must have the same names as parameters
        serializer = CartSerializer(instance=cart, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(status=status.HTTP_200_OK)
    
    def delete_cart(self, request, user_id=None): # DELETE /api/users/<int:user_id>/cart/
        cart = Cart.objects.get(user=user_id)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    