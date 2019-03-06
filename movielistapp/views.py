from django.shortcuts import render

from django.views import generic, View
from django.urls import reverse_lazy
from .models import Movie

from django.contrib.auth.models import User


# Create your views here.

class MovieDetailView(generic.DetailView):
    model = Movie
    template_name = 'movie/movie_detail.html'


def index(request):
    context = {}
    return render(request, 'index.html', context)
