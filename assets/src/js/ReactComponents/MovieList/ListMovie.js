import React from 'react';

export default class ListMovie extends React.Component {
    constructor(props)
    {
      super(props);

      this.state = {
        movies: props.movies,
      }
    }

    createListGenres(currentGenres) {
        let genres = this.props.data.genres;
        let listGenres = [];

        currentGenres.forEach(pk => {
            if (listGenres.length > 0)
            {
                listGenres.push(', ');
            }
            listGenres.push(genres.filter( genre => genre.pk == pk)[0].fields.name);
        });

        return listGenres;
    }
    createThumbnails() {
        let listThumbails = [];
        if (this.state.movies !== null && this.state.movies !== undefined)
        {
            this.state.movies.forEach(movie => {
                listThumbails.push(
                    <div className="tile box is-parent is-vertical" key={ movie.pk }>
                        <div className="tile is-child is-12 has-text-centered">
                            <h1 className="subtitle has-text-weight-bold"><a className="has-text-black" href={'/movie/' + movie.pk}>{ movie.fields.name }</a></h1>
                        </div>
                        <div className="tile is-child">
                            <div className="tile">
                                <div className="tile is-2 has-text-centered is-vcentered column">
                                    <figure className="container image is-128x128">
                                        <img src={ movie.fields.poster_link } alt={ movie.fields.name } />
                                    </figure>
                                </div>
                                <div className="tile is-10 is-vertical is-parent">
                                    <div className="tile is-child">
                                        <span className="has-text-weight-bold">Genre </span>
                                        <span>{this.createListGenres(movie.fields.genres)}</span>
                                    </div>
                                    <div className="tile is-child">
                                        <span className="has-text-weight-bold">Note </span>
                                        <span>{ movie.fields.note }</span>
                                    </div>
                                    <div className="tile is-child">
                                        <h2 className="has-text-weight-bold">Plot</h2>
                                        <span>{ movie.fields.plot }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });

            if(listThumbails.length === 0)
            {
              return <div className="notification is-warning">There are no movies in this list</div>

            }

            return listThumbails;
        }
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="tile is-ancestor is-vertical">
                        <div className="tile is-parent">
                            <div className="tile is-child">
                                <h1 className="title">List of {this.props.data.user.name}</h1>
                            </div>
                        </div>
                        {this.createThumbnails()}
                    </div>
                </div>
            </section>
        );
    }
}
