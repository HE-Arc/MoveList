from django.db import models
from movielistapp.listmodels.movie import Movie
from movielistapp.listmodels.state import State
from django.contrib.auth.models import User

class ListMovie(models.Model):
    note=models.IntegerField()
    movie=models.ForeignKey(Movie, on_delete=models.CASCADE)
    state=models.ForeignKey(State, on_delete=models.CASCADE)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
