from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index),
    path('generate_test_insertions/', views.generate_test_insertions),
]