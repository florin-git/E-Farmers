from django.urls import path
from . import views
from .views import ShowProfilePageView

urlpatterns = [
    path('', views.show_home, name = 'home'),
    path('login', views.login_user, name = 'login'),
    path('signup', views.signup, name = 'signup'),
    path('logout_user',views.logout_user, name = 'logout'),
    #path('<int:pk>/profile', ShowProfilePageView.as_view(), name = 'show_profile_page'),
    path('profile/', views.ShowProfilePageView.as_view(), name = 'show_profile_page'),
]