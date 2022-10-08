from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    # Orders
    path('orders/<int:id>/', OrdersView.as_view({
        'post': 'save_order',
    }))    

]