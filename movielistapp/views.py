from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic, View
from django.db import models
from .models import Movie, Person, Genre, Country, Type
from django.urls import reverse
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse, HttpResponseRedirect
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
import json, urllib
from django.contrib.auth.decorators import login_required
import requests, datetime

from .models import Movie, ListMovie, Genre, State, Country, Type, Person


def movie_detail(request, movie_pk):
    context = {}

    context['movie'] = Movie.objects.select_related('type', 'director').get(pk=movie_pk)
    context['states'] = serializers.serialize('json', State.objects.all())

    if request.user.is_authenticated:
        try:
            listEntry = ListMovie.objects.get(movie=context['movie'], user=request.user)
            context['list_id'] = listEntry.pk
            context['rating'] = listEntry.note
        except ObjectDoesNotExist:
            noneJson = json.dumps(None)
            context['list_id'] = noneJson
            context['rating'] = noneJson

    return render(request, 'movie/movie_detail.html', context)


def add_movie_to_list(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    current_user = request.user

    data = json.loads(request.body)

    try:
        list_movie = ListMovie.objects.create(user=current_user, movie=movie, state=State.objects.get(pk=data['state']),
                                              note=data['rating'])
        return JsonResponse({'listId': list_movie.pk}, status=200)
    except IntegrityError as e:
        return HttpResponseBadRequest()


def edit_movie_in_list(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    current_user = request.user

    data = json.loads(request.body)

    try:
        list_movie = ListMovie.objects.filter(user=current_user, movie=movie).update(
            state=State.objects.get(pk=data['state']), note=data['rating'])
        return JsonResponse({'listId': movie_pk}, status=200)
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


@login_required
def display_my_list(request):
    return display_list(request.user, request)


def display_user_list(request, user_pk):
    try:
        user = User.objects.get(pk=user_pk)
        return display_list(user, request)
    except ObjectDoesNotExist:
        HttpResponseNotFound()


def display_list(user, request):
    context = {}
    context['error'] = False
    try:
        error = request.GET['error']
        if error is not None and error == '1':
            context['error'] = True

    except:
        pass

    if user is not None:
        try:
            movies = []
            data = {}

            usermovies = ListMovie.objects.select_related('movie').filter(user=user.pk)

            data['usermovies'] = serializers.serialize('json', usermovies)
            data['movies'] = serializers.serialize('json', list(map(lambda element: element.movie, usermovies)))
            data['states'] = serializers.serialize('json', list(map(lambda element: element.state, usermovies)))
            data['types'] = serializers.serialize('json', list(Type.objects.all()))
            data['genres'] = serializers.serialize('json', list(Genre.objects.all()))
            data['people'] = serializers.serialize('json', list(Person.objects.all()))
            data['user'] = user.username
            data['user_id'] = user.pk

            context['data'] = data
            print(data)
        except ObjectDoesNotExist:
            context['data'] = None
    return render(request, 'my_list.html', context)


def index(request):
    context = {}
    return render(request, 'index.html', context)


class search(View):
    def get(self, request):
        try:
            title = request.GET['title']
        except:
            return redirect('index')
        try:
            year = int(request.GET['year'])
        except:
            year = None

        m = Movie.objects.filter(name=title).first() if year is None else Movie.objects.filter(name=title,
                                                                                               year=year).first()
        if m is None:
            api_request = f'http://www.omdbapi.com/?t={title}&apikey=f625944d' if year is None \
                else f'http://www.omdbapi.com/?t={title}&y={year}&apikey=f625944d'
            r = requests.get(api_request)
            f = r.json()
            if is_in_api(f):
                m = add_json_db(f)
                return redirect('movie_detail', movie_pk=m.id)
            else:
                url = reverse('display_user_list', kwargs={'user_pk': request.user.id})
                return HttpResponseRedirect(url + "?error=1")
        else:
            return redirect('movie_detail', movie_pk=m.id)


def add_json_db(movie):
    if movie["Response"] == 'True':
        actors = many_get_or_add_in_db(movie["Actors"], Person)
        genres = many_get_or_add_in_db(movie["Genre"], Genre)
        director = get_or_add_in_db(movie['Director'], Person)
        countries = many_get_or_add_in_db(movie['Country'], Country)
        type_movie = get_or_add_in_db(movie['Type'], Type)
        writer = many_get_or_add_in_db(movie['Writer'], Person)
        new_movie_info = Movie.objects.get_or_create(imdbID=movie['imdbID'], name=movie['Title'],
                                                     year=movie['Year'], released=format_date(movie['Released']),
                                                     runtime=movie['Runtime'], poster_link=movie['Poster'],
                                                     ratings=movie['Ratings'], plot=movie['Plot'],
                                                     awards=movie['Awards'], dvd=format_date(movie['DVD']),
                                                     director=director,
                                                     type=type_movie)
        new_movie, is_created = new_movie_info
        if is_created:
            add_relation(new_movie.scenarist, writer)
            add_relation(new_movie.actors, actors)
            add_relation(new_movie.country, countries)
            add_relation(new_movie.genres, genres)
        return new_movie


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
    if date == 'N/A':
        return None
    return datetime.datetime.strptime(date, '%d %b %Y').strftime('%Y-%m-%d')


def is_in_api(movie):
    if movie["Response"] == 'True':
        return True
    return False
