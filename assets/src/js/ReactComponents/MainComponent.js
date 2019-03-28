import React from 'react';
import Search from './Search.js';
import Filters from './Filters.js';
import ListMovie from './MovieList/ListMovie.js';

export default class MainComponent extends React.Component {
    constructor(props)
    {
        super(props);

        // multiple parse for the same props is to make different list

        let movies = JSON.parse(props.movies);
        this.state = {
            usermovies : JSON.parse(props.usermovies),
            moviesFiltred : JSON.parse(props.movies),
            movies : JSON.parse(props.movies),
            state : JSON.parse(props.states).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            type : JSON.parse(props.types).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            genres : JSON.parse(props.genres).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            director : JSON.parse(props.people).filter( person => movies.filter(movie => movie.fields.director == person.pk).length > 0).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            scenarists : JSON.parse(props.people).filter( person => movies.filter(movie => movie.fields.scenarists.includes(person.pk)).length > 0).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            actors : JSON.parse(props.people).filter( person => movies.filter(movie => movie.fields.actors.includes(person.pk)).length > 0).sort((a, b) => (a.fields.name > b.fields.name) ? 1 : -1),
            user : {name: props.user, id: props.user_id},
            nbFilter : 0,
            filters : { // storage filter
                state : [],
                type : [],
                genres : [],
                director : [],
                scenarists : [],
                actors : []
            }
        }

        this.handleFiltersChange = this.handleFiltersChange.bind(this);
        this.handleFiltersSort = this.handleFiltersSort.bind(this);
        this.listMovie = React.createRef();
    }

    /**
     * filters list movie
     * @param {*} filter 
     * @param {*} value 
     */
    handleFiltersChange(filter, value) {

        console.log(filter);
        // update storage filter
        value = parseInt(value);
        if (this.state.filters[filter].includes(value))
            this.state.filters[filter].splice(this.state.filters[filter].indexOf(value), 1);
        else
            this.state.filters[filter].push(value);

        // Reload list movie
        this.state.moviesFiltred = JSON.parse(JSON.stringify(this.state.movies)); // depth copy

        let filters = this.state.filters;
        let usermovies = this.state.usermovies;

        // filters
        if (filters.state.length > 0)
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => filters.state.includes(usermovies.filter(usermovie => usermovie.fields.movie == movie.pk)[0].fields.state));
        
        if (filters.type.length > 0)
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => filters.type.includes(movie.fields.type));
        
        if (filters.genres.length > 0)
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields.genres.filter(genre => filters.genres.includes(genre)) > 0);

        if (filters.director.length > 0)
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => filters.director.includes(movie.fields.director));

        if (filters.scenarists.length > 0)
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields.scenarists.filter(scenarist => filters.scenarists.includes(scenarist)) > 0);

        if (filters.actors.length > 0)
            this.state.moviesFiltred = this.state.moviesFiltred.filter(movie => movie.fields.actors.filter(actor => filters.actors.includes(actor)) > 0);

        this.updateListMovies();
    }

    /**
     * sort list movie
     * @param {*} filter 
     * @param {*} value 
     * @param {*} type 
     */
    handleFiltersSort(filter, value, type) {

        let orientation = (value == "ASC") ? 1 : -1;

        let usermovies = this.state.usermovies;
        let elements = this.state[filter];

        switch (type) {
            // Specific because the data is not stocked in the model Movie but ListMovie
            case "state":
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(movieA, movieB) {
                    console.log(elements);
                    let elementA = elements.filter(element => element.pk == usermovies.filter(usermovie => usermovie.fields.movie == movieA.pk)[0].fields[filter])[0];
                    let elementB = elements.filter(element => element.pk == usermovies.filter(usermovie => usermovie.fields.movie == movieB.pk)[0].fields[filter])[0];
                    
                    return (elementA.fields.name > elementB.fields.name) ? orientation : (elementA.fields.name < elementB.fields.name) ? - orientation : 0;
                });
                break;

            // For foreign key OneToMany
            case "list":
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(movieA, movieB) {

                    // Retrieve all keys sorted for each element
                    let pksA = movieA.fields[filter].sort((a, b) => (elements.filter(element => element.pk == a)[0].fields.name >= elements.filter(element => element.pk == b)[0].fields.name) ? 1 : -1);
                    let pksB = movieB.fields[filter].sort((a, b) => (elements.filter(element => element.pk == a)[0].fields.name >= elements.filter(element => element.pk == b)[0].fields.name) ? 1 : -1);   

                    // Sort elements by multiple key
                    let nbPkA = pksA.length;
                    let nbPkB = pksB.length;
                    let nbPk = ( nbPkA <= nbPkB) ? nbPkA : nbPkB;

                    let order = 0;

                    for (let index = 0 ; index < nbPk; index++)
                    {
                        let elementA = elements.filter(element => element.pk == pksA[index])[0];
                        let elementB = elements.filter(element => element.pk == pksB[index])[0];

                        order = (elementA.fields.name > elementB.fields.name) ? orientation : (elementA.fields.name < elementB.fields.name) ? - orientation : 0;

                        if (order != 0)
                            index = nbPk;
                    }

                    // Less keys first
                    return (order == 0) ? (nbPkA >= nbPkB) ? orientation : -orientation : order;
                });

                break;

            // Foreign key OneToOne
            case "number":
                // Specific to sort people
                
                console.log(filter);
                this.state.moviesFiltred = this.state.moviesFiltred.sort(function(movieA, movieB) {
   
                    let elementA = elements.filter(element => element.pk == movieA.fields[filter])[0];
                    let elementB = elements.filter(element => element.pk == movieB.fields[filter])[0];

                    return(elementA.fields.name > elementB.fields.name) ? orientation : (elementA.fields.name < elementB.fields.name) ? - orientation : 0;
                });

                break;
        }

        this.updateListMovies();
    }

    // Update the child component listMovie
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
