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

class CartItemView(viewsets.ViewSet):

    def list_cart_items(self, request, user_id=None):   # GET /api/users/<int:user_id>/cart/items/
        
        shopping_cart = Cart.objects.get(user=user_id);
        cart_id = shopping_cart.pk;

        cart_items = CartItem.objects.filter(cart_id=cart_id).order_by('size')

        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def add_box(self, request, user_id=None):   # PUT /api/users/<int:user_id>/cart/items/

#        cart = Cart.objects.get(user=user_id)
#        box_size = request.size;
#        box_insertion = request.insertion;
#        box_object = Box.objects.get(insertion=box_insertion, size=box_size)
        try:
            shopping_cart = Cart.objects.get(user=user_id);
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        box_farmer = request.data['farmer'];
        if(box_farmer == shopping_cart.current_farmer):

            serializer = CartItemSerializer(data={
                'cart': shopping_cart.pk,
                'size': request.data['size'],
                'price': request.data['price']
            })

            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_409_CONFLICT)