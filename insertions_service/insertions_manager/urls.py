from django.urls import path
from .views import *

urlpatterns = [
    # Insertions
    path('insertions/', InsertionsView.as_view({
        'get': 'list_insertions',
        'post': 'publish_insertion',
    })),
    path('insertions/<str:insertion_id>', InsertionsView.as_view({
        'get': 'retrieve_insertion',
        'put': 'update_insertion',
        'delete': 'delete_insertion'
    })),

    # Boxes
    path('insertions/<str:insertion_id>/boxes', BoxesView.as_view({
        'get': 'list_insertion_boxes',
        'post': 'add_boxes'
    }))
]