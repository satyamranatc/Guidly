from django.urls import path

from . import views

urlpatterns = [
    path('login', views.LoginView),
    path('register', views.RegisterView),
    path("userDetails",views.UserDetails)
]
