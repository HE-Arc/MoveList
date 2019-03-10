from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('movie/<pk>/', views.MovieDetailView.as_view(), name='movie_detail'),
    path('movie/search/<title>', views.Search.as_view(), name="search"),
]
