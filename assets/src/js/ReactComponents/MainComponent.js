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
            states : JSON.parse(props.states).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            types : JSON.parse(props.types).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            genres : JSON.parse(props.genres).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            people : JSON.parse(props.people).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
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
                let states = this.state.states;
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(movieA, movieB) {
 
                    let elementA = states.filter(element => element.pk == usermovies.filter(usermovie => usermovie.fields.movie == movieA.pk)[0].fields[filter])[0];
                    let elementB = states.filter(element => element.pk == usermovies.filter(usermovie => usermovie.fields.movie == movieB.pk)[0].fields[filter])[0];
                    
                    return (elementA.fields.name > elementB.fields.name) ? orientation : (elementA.fields.name < elementB.fields.name) ? - orientation : 0;
                });

                break;
            case "list":
                let elements = this.state[filter];
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(movieA, movieB){
                    let elementA = elements.filter(element => element.pk = usermovies.filter(usermovie => usermovie.fields.movie == movieA.pk)[0].fields[filter].sort((a, b) => (a.name > b.name) ? orientation : -orientation))[0];
                    let elementB = elements.filter(element => element.pk = usermovies.filter(usermovie => usermovie.fields.movie == movieB.pk)[0].fields[filter].sort((a, b) => (a.name > b.name) ? orientation : -orientation))[0];

                    return (elementA.fields.name > elementB.fields.name) ? orientation : (elementA.fields.name < elementB.fields.name) ? - orientation : 0;
                });
                
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
                <ListMovie  ref={this.listMovie} movies={ this.state.moviesFiltred } usermovies={ this.state.usermovies } data={ this.state } />
            </div>
        );
    }
}
