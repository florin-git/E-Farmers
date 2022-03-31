from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='insertions'),
    path('new/', views.new, name='new'),
    path('<int:insertion_id>/boxes/add/', views.add_boxes, name='add_boxes'),
    path('<int:insertion_id>/boxes/', views.boxes, name='boxes'),
    path('<int:insertion_id>/edit/', views.edit, name='edit'),
    path('<int:insertion_id>/delete/', views.delete, name='delete'),
    path('<int:insertion_id>', views.show, name='show'),
]