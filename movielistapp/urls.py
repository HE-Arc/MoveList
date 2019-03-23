from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('mylist/', views.display_my_list, name='my_list'),
    path('movie/<movie_pk>/', views.movie_detail, name='movie_detail'),
    path('list/<user_pk>/', views.display_user_list, name='display_user_list'),
    path('list/add/<movie_pk>/', views.add_movie_to_list, name='add_movie_to_list'),
    path('list/edit/<movie_pk>/', views.edit_movie_in_list, name='add_movie_to_list'),
    path('list/remove/<movie_pk>/', views.remove_movie_from_list, name='remove_movie_from_list'),
    path('search/', views.search.as_view(), name="search"),
]
