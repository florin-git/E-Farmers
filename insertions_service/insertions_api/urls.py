from django.urls import path
from .views import *

urlpatterns = [
    # Insertions
    path('insertions/', InsertionsView.as_view({
        'get': 'list_insertions',
        'post': 'publish_insertion',
    })),
    path('insertions/<int:insertion_id>/image/', InsertionsView.as_view({
        'get': 'retrieve_insertion_image'
    })),
    path('insertions/<int:insertion_id>/', InsertionsView.as_view({
        'get': 'retrieve_insertion',
        'put': 'update_insertion',
        'delete': 'delete_insertion'
    })),

    # Boxes
    path('insertions/<int:insertion_id>/boxes/', BoxesView.as_view({
        'get': 'list_insertion_boxes',
        'post': 'add_boxes'
    })),

    # Booking
    path('booking/', BookingView.as_view({
        'get': 'get_request',
        'post': 'book_product',
        'put': 'accept_request',
        'delete': 'cancel_booking'
    })),
    
    path('booking/requests/', BookingView.as_view({
        'get': 'list_booked_products'
    })),

    path('booking/inbox/', BookingView.as_view({
        'get': 'list_requests'
    }))
]