import React from 'react';

export default class Thumbnails extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            movies: this.props.movies,
        }
    }

    createListGenres(currentGenres) {
        let genres = this.props.data.genres;
        console.log(genres);
        let listGenres = genres.filter(genre => currentGenres.includes(genre.pk)).map(genre => genre.fields.name);

        return listGenres.join(', ');
    }
  
    getViewing(movie)
    {
        let tileNote = [];

        let viewingMovie = this.props.usermovies.filter(usermovie => usermovie.fields.movie == movie.pk)[0];
        let state = this.props.data.states.filter(states => states.pk == viewingMovie.fields.state)[0];

        tileNote.push(
            <div className="tile is-child">
                <div className="has-text-weight-bold tag is-warning">State</div>
                <span> { state.fields.name }</span>
            </div>
        );

        if ( movie.fields.ratings != null) {
            tileNote.push(
                <div className="tile is-child">
                    <div className="has-text-weight-bold tag is-warning">My note</div>
                    <span> { movie.fields.ratings } / 10</span>
                </div>
            );
        }

        return tileNote;
    }
  
    render() {
        let listThumbails = [];
        
        if (this.state.movies.length > 0)
        {
            this.state.movies.forEach(movie => {

                let keyMovie = "movie" + movie.pk;

                listThumbails.push(
                    <a className="tile box is-parent is-vertical" href={'/movie/' + movie.pk} key={ keyMovie }>
                        <div className="tile is-child is-12 has-text-centered">
                            <h1 className="subtitle has-text-weight-bold">{ movie.fields.name }</h1>
                        </div>
                        <div className="tile is-child">
                            <div className="tile">
                                <div className="tile is-2 has-text-centered  is-vcentered column">
                                    <figure className="container image list-thumbnails">
                                        <img src={ movie.fields.poster_link } alt={ movie.fields.name } />
                                    </figure>
                                </div>
                                <div className="tile is-10 is-vertical is-parent">
                                    <div className="tile is-child">
                                        <span className="has-text-weight-bold tag is-warning">Genre</span>
                                        <span> {this.createListGenres(movie.fields.genres)}</span>
                                    </div>
                                    {this.getViewing(movie)}
                                    <div className="tile is-child">
                                        <span className="has-text-weight-bold  tag is-warning">Plot</span>
                                        <span> { movie.fields.plot }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                );
            });

            return listThumbails;
        } else {
            return (<div className="notification is-warning">There are no movies in this list</div>);
        }
    }
}