from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.main, name='main'),
    path('movie/<movie_pk>/', views.movie_detail, name='movie_detail'),
    path('list/add/<movie_pk>/', views.add_movie_to_list, name='add_movie_to_list'),

]
