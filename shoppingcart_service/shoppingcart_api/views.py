# from itsdangerous import Serializer
from .models import *
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response

class CartView(viewsets.ViewSet):
    
    def create_cart(self, request, user_id=None):   # POST /api/users/<int:user_id>/cart/
        serializer = CartSerializer(
            data={
                "user": user_id,
                "current_farmer": request.data['farmer']
            }
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(#{'cart_id': serializer.data['id']},
                status=status.HTTP_201_CREATED
            )
    
    def delete_cart(self, request, user_id=None):   # DELETE /api/users/<int:user_id>/cart/
        cart = Cart.objects.get(user=user_id)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_cart(self, request, user_id=None):  # GET /api/users/<int:user_id>/cart/
        cart = Cart.objects.get(user=user_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartItemView(viewsets.ViewSet):

    def list_cart_items(self, request, user_id=None):   # GET /api/users/<int:user_id>/cart/items/
        
        shopping_cart = Cart.objects.get(user=user_id)
        cart_id = shopping_cart.pk

        cart_items = CartItem.objects.filter(cart_id=cart_id).order_by('size')

        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def add_box(self, request, user_id=None):   # PUT /api/users/<int:user_id>/cart/items/
        
        try:
            shopping_cart = Cart.objects.get(user=user_id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        box_farmer = request.data['farmer']
        if box_farmer == shopping_cart.current_farmer:
            serializer = CartItemSerializer(data={
                'cart': shopping_cart.pk,
                'box_id': request.data['box_id'],
                'name': request.data['name'],
                'size': request.data['size'],
                'weight': request.data['weight'],
                'price': request.data['price']
            })

            
            n_items = shopping_cart.number_of_items + 1 
            shopping_cart.number_of_items = n_items

            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_409_CONFLICT)
    
    def remove_box(self, request, user_id=None):    # DELETE /api/users/<int:user_id>/cart/items/
        # try:
        #     shopping_cart = Cart.objects.get(user=user_id)
        # except:
        #     return Response(status=status.HTTP_404_NOT_FOUND)

        box = CartItem.objects.get(id=request.data['box_id'])

        box.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
