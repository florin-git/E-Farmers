from django.urls import path
from .views import *

urlpatterns = [
    path('users/<int:user_id>/cart/', CartView.as_view({
        'post':'create_cart',
        'get': 'cart_info',
        'put': 'add_boxes',
        'delete': 'delete_cart'
    })),
]