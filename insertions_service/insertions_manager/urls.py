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

    # path('', views.index, name='insertions'),
    # path('new/', views.new, name='new'),
    # path('<int:insertion_id>/boxes/add/', views.add_boxes, name='add_boxes'),
    # path('<int:insertion_id>/boxes/', views.boxes, name='boxes'),
    # path('<int:insertion_id>/edit/', views.edit, name='edit'),
    # path('<int:insertion_id>/delete/', views.delete, name='delete'),
    # path('<int:insertion_id>', views.show, name='show'),
]