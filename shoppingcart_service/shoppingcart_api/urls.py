from django.urls import path
from .views import *

urlpatterns = [
    path('users/<int:user_id>/cart/', CartView.as_view({
        'get':'get_cart',
        'post':'create_cart',
        'delete': 'delete_cart'
    })),
    path('users/<int:user_id>/cart/items/', CartItemView.as_view({
        'get':'list_cart_items',
        'put':'add_box',
        'delete':'remove_box'
    }))
]