from django.contrib import admin

from .models import Person, Country, Type, Genre, State, Movie, ListMovie

admin.site.register(Person)
admin.site.register(Country)
admin.site.register(Type)
admin.site.register(Genre)
admin.site.register(State)
admin.site.register(Movie)
admin.site.register(ListMovie)
