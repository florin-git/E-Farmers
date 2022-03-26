from django.urls import path
from . import views
from .views import SignUpView
#path('signup', views.signup, name = 'signup'),
urlpatterns = [
    path('', views.show_home, name = 'home'),
    path('login', views.login_user, name = 'login'),
    path('signup', views.signup, name = 'signup'),
    path('logout_user',views.logout_user, name = 'logout'),
]