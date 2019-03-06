from django.shortcuts import render

from django.views import generic, View
from django.urls import reverse_lazy
from .models import Movie
from .models import ListMovie

from django.contrib.auth.models import User


# Create your views here.

class MovieDetailView(generic.DetailView):
    model = Movie
    template_name = 'movie/movie_detail.html'


def MainView(request):
    listMovie = ListMovie.object.get(user=request.user.pk)
    movies = Movie.objects.get(listMovie=listMovie.pk)
    context = {'movies': movies}
    return render(request, 'main.html', context)

def index(request):
    context = {}
    return render(request, 'index.html', context)
