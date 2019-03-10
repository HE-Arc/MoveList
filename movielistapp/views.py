from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic, View
from django.urls import reverse_lazy
from .models import Movie, Person, Genre
import requests
import json

from django.contrib.auth.models import User


# Create your views here.

class MovieDetailView(generic.DetailView):
    model = Movie
    template_name = 'movie/movie_detail.html'


def index(request):
    context = {}
    return render(request, 'index.html', context)


class Search(View):
    def get(self, request, title):
        m = Movie.objects.filter(name=title).first()
        if m is None:
            api_request = f'http://www.omdbapi.com/?t={title}&apikey=f625944d'
            r = requests.get(api_request)
            f = r.json()
            m = add_json_db(f)
            return HttpResponse(f["Genre"])
        return redirect('movie_detail', pk=m.id)


def add_json_db(movie):
    if movie["Response"] == 'True':
        actors = get_or_add_actor(movie["Actors"])
        genres = get_or_add_genre(movie["Genre"])
        return True
    else:
        return False


def get_or_add_actor(str_actors):
    list_actors = []
    actors = str(str_actors).split(", ")
    for actor in actors:
        list_actors.append(Person.objects.get_or_create(name=actor))
    return list_actors


def get_or_add_genre(str_genres):
    list_genres = []
    genres = str(str_genres).split(", ")
    for genre in genres:
        list_genres.append(Genre.objects.get_or_create(name=genre))
    return list_genres
