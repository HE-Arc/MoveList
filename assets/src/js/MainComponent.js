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
        data.genres = JSON.parse(jsonData.genres);
        data.countrys = JSON.parse(jsonData.countrys);

        this.state = {
            data : data,
            moviesFiltred : JSON.parse(jsonData.movies), // depthcopy
        }
      
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.listMovie = React.createRef();
    }

    handleFiltersChange(filter, value, checked) {

        if (checked) {
            this.state.moviesFiltred = this.state.data.movies.filter( movie => this.state.moviesFiltred.indexOf(movie) || movie.fields[filter].indexOf(parseInt(value)) >= 0);
        } else {
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields[filter].indexOf(parseInt(value)) < 0);
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
