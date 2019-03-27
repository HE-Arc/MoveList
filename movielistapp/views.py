from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic, View
from django.db import models
from django.db import IntegrityError
from django.db.models.functions import Lower
from .models import Movie, Person, Genre, Country, Type
from django.urls import reverse
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.contrib.auth.decorators import login_required
import json, urllib
import requests, datetime
from django.db.models import Avg

from .models import Movie, ListMovie, Genre, State, Country, Type, Person


def movie_detail(request, movie_pk):
    context = {}

    context['movie'] = Movie.objects.select_related('type', 'director').get(pk=movie_pk)
    context['states'] = serializers.serialize('json', State.objects.all())
    context['movielistrating'] = ListMovie.objects.filter(movie__pk=movie_pk).aggregate(Avg('note'))['note__avg']

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


@login_required
def add_movie_to_list(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    current_user = request.user
    data = json.loads(request.body)
    rating = None
    state = None

    if data['rating'] != '':
        rating = data['rating']

    if data['state'] != '':
        state = State.objects.get(pk=data['state'])

    try:
        list_movie = ListMovie.objects.create(user=current_user, movie=movie, state=state,
                                              note=rating)
        return JsonResponse({'listId': list_movie.pk}, status=200)
    except IntegrityError as e:
        return HttpResponseBadRequest()


@login_required
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


@login_required
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

            states = State.objects.all()

            data['usermovies'] = serializers.serialize('json', usermovies)
            data['movies'] = serializers.serialize('json', list(map(lambda element: element.movie, usermovies)))
            data['states'] = serializers.serialize('json', list(states))
            data['types'] = serializers.serialize('json', list(Type.objects.all()))
            data['genres'] = serializers.serialize('json', list(Genre.objects.all()))
            data['people'] = serializers.serialize('json', list(Person.objects.all()))
            data['user'] = user.username
            data['user_id'] = user.pk

            context['data'] = data
        except ObjectDoesNotExist:
            context['data'] = None
    return render(request, 'my_list.html', context)


def index(request):
    context = {}
    context['error'] = False
    try:
        error = request.GET['error']
        if error is not None and error == '1':
            context['error'] = True
    except:
        pass
    return render(request, 'index.html', context)


class search(View):
    def get(self, request):
        id = None
        year = None
        title = None
        key = 'f625944d'

        try:
            title = request.GET['title']
            try:
                year = int(request.GET['year'])
            except:
                pass
        except:
            try:
                id = request.GET['i']
            except:
                return redirect('index')

        if title is not None:
            m = Movie.objects.filter(
                name__search=title).all() if year is None else Movie.objects.filter(name=title,
                                                                                                         year=year).all()
        else:
            m = Movie.objects.filter(imdbID=id).first()

        if m is None or len(m) == 0:
            if title is not None:
                api_request = f'http://www.omdbapi.com/?t={title}&apikey={key}' if year is None \
                    else f'http://www.omdbapi.com/?t={title}&y={year}&apikey={key}'
            else:
                api_request = f'http://www.omdbapi.com/?i={id}&apikey={key}'
            r = requests.get(api_request)
            f = r.json()
            if is_in_api(f):
                m = add_json_db(f)
                return redirect('movie_detail', movie_pk=m.id)
            else:
                if request.user.is_authenticated:
                    url = reverse('my_list')
                else:
                    url = reverse('index')
                return HttpResponseRedirect(url + "?error=1")
        else:
            if type(m) == Movie:
                return redirect('movie_detail', movie_pk=m.id)
            else:
                if len(m) == 1:
                    return redirect('movie_detail', movie_pk=m[0].id)

                print(m)
                context = {}
                context['movies'] = m
                return render(request, 'multiple_result_search.html', context)


def add_json_db(movie):
    if movie["Response"] == 'True':
        actors = many_get_or_add_in_db(movie["Actors"], Person)
        genres = many_get_or_add_in_db(movie["Genre"], Genre)
        director = get_or_add_in_db(movie['Director'], Person)
        countries = many_get_or_add_in_db(movie['Country'], Country)
        type_movie = get_or_add_in_db(movie['Type'], Type)
        writer = many_get_or_add_in_db(movie['Writer'], Person)
        ratings = movie['Ratings']

        try:
            dvd = movie['DVD']
        except:
            dvd = None

        is_created = True
        movie_selected = None

        try:
            movie_selected = Movie.objects.create(imdbID=movie['imdbID'], name=movie['Title'],
                                                  year=format_year(movie['Year']),
                                                  released=format_date(movie['Released']),
                                                  runtime=movie['Runtime'], poster_link=movie['Poster'],
                                                  ratings=ratings, plot=movie['Plot'],
                                                  awards=movie['Awards'], dvd=format_date(dvd),
                                                  director=director,
                                                  type=type_movie)
        except IntegrityError as e:
            movie_selected = Movie.objects.get(imdbID=movie['imdbID'])
            is_created = False
            print(e)

        if is_created:
            add_relation(movie_selected.scenarists, writer)
            add_relation(movie_selected.actors, actors)
            add_relation(movie_selected.countrys, countries)
            add_relation(movie_selected.genres, genres)
        return movie_selected


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
    if date == 'N/A' or date is None:
        return None
    return datetime.datetime.strptime(date, '%d %b %Y').strftime('%Y-%m-%d')


def is_in_api(movie):
    if movie["Response"] == 'True':
        return True
    return False


def format_year(year):
    return year[:4]
