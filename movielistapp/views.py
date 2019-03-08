from django.shortcuts import render
from django.views import generic, View
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers

import json

from .models import Movie, ListMovie, State

def movie_detail(request, movie_pk):
    context = {}
    context['movie'] = Movie.objects.get(pk=movie_pk)
    context['states'] = serializers.serialize('json', State.objects.all())

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

def index(request):
    context = {}
    return render(request, 'index.html', context)
