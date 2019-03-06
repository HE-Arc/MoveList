from django.shortcuts import render
from django.views import generic, View
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

import json

from .models import Movie, ListMovie




# Create your views here.

# class MovieDetailView(generic.DetailView):
#     model = Movie
#     template_name = 'movie/movie_detail.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['has_in_list'] = ListMovie.objects.get(user=request.user.id, movie)
#         return context

def movie_detail(request, movie_pk):
    context = {}
    context['movie'] = Movie.objects.get(pk=movie_pk)
    try :
        ListMovie.objects.get(movie=context['movie'], user=request.user)
        context['has_movie_in_list'] = True
    except ObjectDoesNotExist:
        context['has_movie_in_list'] = False
    return render(request, 'movie/movie_detail.html', context)


def add_movie_to_list(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    current_user = request.user

    list_movie = ListMovie.objects.create()
    list_movie.user = current_user
    list_movie.movie = movie

    try:
        list_movie.save()
        return HttpResponse(status=204)
    except IntegrityError as e:
        return HttpResponse(status=409)



def index(request):
    context = {}
    return render(request, 'index.html', context)
