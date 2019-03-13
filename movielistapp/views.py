from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic, View
from django.db import models
from .models import Movie, Person, Genre, Country, Type
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
import json
import requests, datetime
from .models import Movie, ListMovie, Genre, State

def movie_detail(request, movie_pk):
    context = {}
    context['movie'] = Movie.objects.get(pk=movie_pk)
    context['states'] = serializers.serialize('json', State.objects.all())

    if request.user.is_authenticated:
        try :
            context['list_id'] = ListMovie.objects.get(movie=context['movie'], user=request.user).pk
        except ObjectDoesNotExist:
            context['list_id'] = json.dumps(None)
            
    return render(request, 'movie/movie_detail.html', context)


def add_movie_to_list(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    current_user = request.user

    data = json.loads(request.body)

    try:
        list_movie = ListMovie.objects.create(user=current_user, movie=movie, state=State.objects.get(pk=data['state']), note=data['rating'])
        return JsonResponse( {'listId': list_movie.pk}, status=200)
    except IntegrityError as e:
        return HttpResponseBadRequest()

def remove_movie_from_list(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    current_user = request.user

    try:
        list_movie = ListMovie.objects.get(user=current_user, movie=movie).delete()
        return HttpResponse(status=204)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

def main(request):
    context = {}
    if request.user is not None:
        try:
            movies = []
            for usermovie in ListMovie.objects.filter(user=request.user.pk):
                movies.append(usermovie.movie)
            context['movies'] = serializers.serialize('json', list(movies))
            context['genres'] = serializers.serialize('json', list(Genre.objects.all()))
        except ObjectDoesNotExist:
            context['movies'] = None
            context['genre'] = None
    return render(request, 'main.html', context)

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
                                         year=movie['Year'], released=format_date(movie['Released']),
                                         runtime=155, poster_link=movie['Poster'],
                                         ratings=movie['Ratings'], plot=movie['Plot'],
                                         awards=movie['Awards'], dvd=format_date(movie['DVD']), director=director,
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


def format_date(date):
    return datetime.datetime.strptime(date, '%d %b %Y').strftime('%Y-%m-%d')
