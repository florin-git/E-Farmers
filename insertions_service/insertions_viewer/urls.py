from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index, name='insertions'),
    path('generate_test_insertions/', views.generate_test_insertions),
    path('test_image', views.test_image),
]