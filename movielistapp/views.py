from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic, View
from django.db import models
from django.urls import reverse_lazy
from .models import Movie, Person, Genre, Country, Type
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
            return HttpResponse(f["Writer"])
        return redirect('movie_detail', pk=m.id)


def add_json_db(movie):
    if movie["Response"] == 'True':
        actors = many_get_or_add_in_db(movie["Actors"], Person)
        genres = many_get_or_add_in_db(movie["Genre"], Genre)
        director = get_or_add_in_db(movie['Director'], Person)
        countries = many_get_or_add_in_db(movie['Country'], Country)
        type_movie = get_or_add_in_db(movie['Type'], Type)
        writer = many_get_or_add_in_db(movie['Writer'], Person)
        new_movie = Movie.objects.create(imdbID=movie['imdbID'], name=movie['Title'],
                                         year=movie['Year'], released='2019-12-12',
                                         runtime=155, poster_link=movie['Poster'],
                                         note='7.7', plot=movie['Plot'],
                                         awards=movie['Awards'], dvd='2019-12-12', director=director,
                                         type=type_movie)
        add_relation(new_movie.scenarist, writer)
        add_relation(new_movie.actors, actors)
        add_relation(new_movie.country, countries)
        add_relation(new_movie.genres, genres)
        return True
    else:
        return False


def many_get_or_add_in_db(str_data, model: models.Model):
    list_data = []
    actors = str(str_data).split(", ")
    for actor in actors:
        list_data.append(model.objects.get_or_create(name=actor)[0])
    return list_data


def get_or_add_in_db(str_data, model: models.Model):
    return model.objects.get_or_create(name=str_data)[0]


def add_relation(movie, datas):
    for data in datas:
        movie.add(data)
