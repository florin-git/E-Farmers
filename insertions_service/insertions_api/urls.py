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
    path('insertions/<int:insertion_id>/increase/', InsertionsView.as_view({
        'put': 'increase_n_boxes'
    })),
    path('insertions/<int:insertion_id>/decrease/', InsertionsView.as_view({
        'put': 'decrease_n_boxes'
    })),

    # Boxes
    path('insertions/<int:insertion_id>/boxes/', BoxesView.as_view({
        'get': 'list_insertion_boxes',
        'post': 'add_boxes'
    })),
    path('insertions/<int:id>/boxes/', BoxesView.as_view({
        'get': 'get_ins_from_box',
    })),
    path('boxes/<int:box_id>/decrease/', BoxesView.as_view({
        'patch' : 'decrease_boxes'
    })),

    # Booking
    path('booking/', BookingView.as_view({
        'post': 'book_product'
    })),

    path('booking/<int:request_id>/', BookingView.as_view({
        'get': 'get_request',
        'put': 'accept_request',
        'delete': 'cancel_booking'
    })),

    path('booking/requests/<int:user_id>/', BookingView.as_view({
        'get': 'list_booked_products'
    })),

    path('booking/inbox/<int:farmer_id>/', BookingView.as_view({
        'get': 'list_requests'
    }))
]