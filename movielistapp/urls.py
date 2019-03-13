from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('movie/search/<title>', views.Search.as_view(), name="search"),
    path('main/', views.main, name='main'),
    path('movie/<movie_pk>/', views.movie_detail, name='movie_detail'),
    path('list/add/<movie_pk>/', views.add_movie_to_list, name='add_movie_to_list'),
    path('list/remove/<movie_pk>/', views.remove_movie_from_list, name='remove_movie_from_list'),
    path('movie/search/<title>', views.Search.as_view(), name="search"),

]
