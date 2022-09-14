from django.urls import path
from .views import *

urlPatterns = [

    #Cart
    path(
        'users/<int:user_id>/cart/', 
        CartView.as_view({
            'get':'cart_info',
        })
    ),
    path(
        'user/<int:user_id>/insertions/<int:insertion_id>/boxes/', 
        CartView.as_view({
            'post': 'add_boxes',
            'delete': 'remove_boxes'
        })
    )
]