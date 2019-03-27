from django.db import models
from movielistapp.listmodels.movie import Movie
from movielistapp.listmodels.state import State
from django.contrib.auth.models import User


class ListMovie(models.Model):
    note = models.IntegerField(null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('movie', 'user')
