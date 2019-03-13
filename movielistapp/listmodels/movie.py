from django.db import models
from movielistapp.listmodels.person import Person
from movielistapp.listmodels.country import Country
from movielistapp.listmodels.type import Type
from movielistapp.listmodels.genre import Genre
from django_mysql.models import JSONField


class Movie(models.Model):
    imdbID = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    released = models.DateField()
    runtime = models.IntegerField()
    poster_link = models.CharField(max_length=200)
    ratings = JSONField()
    plot = models.CharField(max_length=200)
    awards = models.CharField(max_length=200, null=True)
    dvd = models.DateField(null=True)
    director = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='director')
    scenarist = models.ManyToManyField(Person, related_name='scenarists')
    actors = models.ManyToManyField(Person, related_name='actors')
    country = models.ManyToManyField(Country, related_name='countries')
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.name
