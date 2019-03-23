import React from 'react';
import Search from './Search.js';
import Filters from './Filters.js';
import ListMovie from './MovieList/ListMovie.js';

export default class MainComponent extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            usermovies : JSON.parse(props.usermovies),
            moviesFiltred : JSON.parse(props.movies),
            movies : JSON.parse(props.movies),
            states : JSON.parse(props.states),
            types : JSON.parse(props.types),
            genres : JSON.parse(props.genres),
            people : JSON.parse(props.people),
            user : {name: props.user, id: props.user_id}
        }

        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.handleFiltersSort = this.handleFiltersSort.bind(this);
        this.listMovie = React.createRef();
    }

    handleFiltersChange(filter, value, checked, type, nbChecked, previousNbChecked) {
        if (nbChecked == 0) {
            this.state.moviesFiltred = JSON.parse(JSON.stringify(this.state.movies)); // depth copy
        } else {
            if (nbChecked == 1 && previousNbChecked == 0) {
                this.state.moviesFiltred.splice(0, this.state.moviesFiltred.length);
            }

            if (checked) {
                switch (type) {
                    case "state":
                        this.state.moviesFiltred = this.state.movies.filter( movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || (this.state.moviesFiltred.indexOf(movie) < 0 && this.state.usermovies.filter(usermovie => usermovie.fields.movie == movie.pk)[0].fields[filter] == parseInt(value)));
                        break;
                    case "list":
                        this.state.moviesFiltred = this.state.movies.filter(movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || movie.fields[filter].indexOf(parseInt(value)) >= 0);
                        break;
                    case "number":
                        this.state.moviesFiltred = this.state.movies.filter(movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || movie.fields[filter] == parseInt(value));
                        break;
                    case "string":
                        this.state.moviesFiltred = this.state.movies.filter(movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || movie.fields[filter] == value);
                        break;
                }
            } else {
                switch (type) {
                    case "state":
                    this.state.moviesFiltred = this.state.moviesFiltred.filter( movie => this.state.usermovies.filter(usermovie => usermovie.fields.movie == movie.pk)[0].fields[filter] != parseInt(value));
                        break;
                    case "list":
                        this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields[filter].indexOf(parseInt(value)) < 0);
                        break;
                    case "number":
                        this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields[filter] != parseInt(value));
                        break;
                    case "string":
                        this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields[filter] != value);
                        break;
                }
            }
        }
        
        this.updateListMovies();
    }

    handleFiltersSort(filter, value, type) {
        let orientation = (value == "ASC") ? 1 : -1;
        let usermovies = this.state.usermovies;

        switch (type) {
            case "state":
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(a, b){return (usermovies.filter(usermovie => usermovie.fields.movie == a.pk)[0].fields[filter] > usermovies.filter(usermovie => usermovie.fields.movie == b.pk)[0].fields[filter])? orientation : -orientation});
                break;
            case "list":
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(a, b){return (a.fields[filter].sort()[0] > b.fields[filter].sort()[0])? orientation : -orientation});
                break;
            case "number":
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(a, b){return (a.fields[filter] > b.fields[filter])? orientation : -orientation});
                break;
        }

        this.updateListMovies();
    }

    updateListMovies() {
        this.listMovie.current.state.movies = this.state.moviesFiltred;
        this.listMovie.current.forceUpdate();
    }

    render() {
        return (
            <div>
                <Search />
                <Filters onChange={this.handleFiltersChange}  onClick={this.handleFiltersSort} data={ this.state } />
                <ListMovie  ref={this.listMovie} movies={ this.state.moviesFiltred } data={ this.state } />
            </div>
        );
    }
}
