from django.urls import path
from .views import *

urlPatterns = [
    #Cart
    path(
        'users/<int:user_id>/cart/<int:cart_id>/', 
        CartView.as_view({
            'get':'cart_info',
        })
    ),

    # Add boxes to cart
    path(
        'user/<int:user_id>/insertion/<int:insertion_id>/boxes/', CartView.as_view({
            'post': 'add_boxes'
        })
    ),

    # Remove boxes from cart
    path(
        'users/<int:user_id>/cart/<int:cart_id>/insertion/<int:insertion_id>/boxes', CartView.as_view({
            'delete': 'remove_boxes'
        })
    )
]