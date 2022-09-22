from .models import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import *

## TODO: aggiungere JWT TOKEN

class CartView(viewsets.ViewSet):
    def create_cart(self, request, user_id=None): # POST /api/users/<int:user_id>/cart/
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    
    def cart_info(self, request, user_id=None): # GET /api/users/<int:user_id>/cart/
        
        # Return the cart info
        
        user = request.data['user']
        cart = Cart.objects.get(user=user)

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def add_boxes(self, request, user_id=None): # PUT /api/users/<int:user_id>/cart/
        user = request.data['user']
        cart = Cart.objects.get(user=user)

        serializer = CartSerializer(instance=cart, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(status=status.HTTP_200_OK)
    
    def delete_cart(self, request, user_id=None): # DELETE /api/users/<int:user_id>/cart/
        user = request.data['user']
        cart = Cart.objects.get(user=user)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    