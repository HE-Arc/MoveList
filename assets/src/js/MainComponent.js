import React from 'react';
import Search from './Search.js';
import Filters from './Filters.js';
import ListMovie from './ListMovie.js';

export default class MainComponent extends React.Component {
    constructor(props)
    {
        super(props);

        let jsonData = JSON.parse(props.data);

        let data = {};
        data.movies = JSON.parse(jsonData.movies);
        data.states = JSON.parse(jsonData.states);
        data.types = JSON.parse(jsonData.types);
        data.genres = JSON.parse(jsonData.genres);
        data.people = JSON.parse(jsonData.people);
        
        this.state = {
            data : data,
            usermovies : JSON.parse(jsonData.usermovies),
            moviesFiltred : JSON.parse(jsonData.movies),
        }
        
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.listMovie = React.createRef();
    }

    handleFiltersChange(filter, value, checked, type, nbChecked, previousNbChecked) {
        if (nbChecked == 0) {
            this.state.moviesFiltred = JSON.parse(JSON.stringify(this.state.data.movies)); // depth copy
        } else {
            if (nbChecked == 1 && previousNbChecked == 0) {
                this.state.moviesFiltred.splice(0, this.state.moviesFiltred.length);
            }

            if (checked) {
                switch (type) {
                    case "state":
                    this.state.moviesFiltred = this.state.data.movies.filter( movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || (this.state.moviesFiltred.indexOf(movie) < 0 && this.state.usermovies.filter(usermovie => usermovie.fields.movie == movie.pk)[0].fields[filter] == parseInt(value)));
                        break;
                    case "list":
                    this.state.moviesFiltred = this.state.data.movies.filter(movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || movie.fields[filter].indexOf(parseInt(value)) >= 0);
                        break;
                    case "number":
                        this.state.moviesFiltred = this.state.data.movies.filter(movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || movie.fields[filter] == parseInt(value));
                            break;
                    case "string":
                        this.state.moviesFiltred = this.state.data.movies.filter(movie => this.state.moviesFiltred.filter(movieFiltred => movieFiltred.pk == movie.pk).length > 0 || movie.fields[filter] == value);
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
        this.listMovie.current.state.movies = this.state.moviesFiltred;
        this.listMovie.current.forceUpdate();
    }

    render() {
        return (
            <div>
                <Search />
                <Filters onChange={this.handleFiltersChange} data={ this.state.data } dataFiltred={ this.state.dataFiltred } />
                <ListMovie  ref={this.listMovie} movies={ this.state.moviesFiltred } data={ this.state.data } />
            </div>
        );
    }
}
