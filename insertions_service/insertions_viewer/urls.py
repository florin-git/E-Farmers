from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='insertions'),
    path('new/', views.new, name='new'),
    path('<int:insertion_id>', views.show, name='show'),
]