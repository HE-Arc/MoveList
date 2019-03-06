import React from 'react';

class ListMovie extends React.Component {
    constructor(props)
    {
      super(props);
    }

    createThumbnails() {
        let listThumbails = [];
        console.log(this.props.movies);
        if (this.props.movies != null && this.props.movies != undefined)
        {
            this.props.movies.forEach(movie => {
                ListMovie.push('<div className="tile"><span>{ movie.name }</span></div>');
            });
            return listThumbails;
        }
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification">
                        <h1 className="title">Recherche de film</h1>
                        {this.createThumbnails()}
                    </div>
                </div>
            </section>
        );
    }    
}
export default ListMovie;