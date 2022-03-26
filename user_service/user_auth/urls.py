from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_home, name = 'home'),
    path('login', views.login_user, name = 'login'),
    path('signup', views.signup, name = 'signup'),
    path('logout_user',views.logout_user, name = 'logout'),
    path('viewProfile', views.viewProfile, name = 'profile'),
]