import React from 'react';
import CopyListUrl from './CopyListUrl.js';
import Thumbnails from './Thumbnails.js';
import ReactPaginate from 'react-paginate';

// https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js

export default class ListMovie extends React.Component {
    constructor(props)
    {
      super(props);

        this.state = {
            offset: 0,
            movies: this.props.movies.filter(movie => movie.pk < props.perPage),
        }

        this.thumbnails = React.createRef();
    }

    

    loadMovies() {
        let start = this.state.movies.length + this.state.offset;
        let stop = start + this.props.perPage;

        this.state.movies.push.apply(this.state.movies, this.props.movies.filter(movie => movie.pk >= start && movie.pk < stop));

        this.state.pageCount =  Math.ceil(this.state.movies / this.props.perPage);

        this.thumbnails.current.state.movies = this.state.movies;
        this.thumbnails.current.forceUpdate();
    }

    handlePageClick(data) {

        this.parent.state.offset = Math.ceil(data.selected * this.parent.props.perPage);

        this.parent.loadMovies();
    };

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="tile is-ancestor is-vertical">
                        <div className="tile is-parent">
                            <div className="tile is-child">
                              <div className="columns">
                                <div className="column is-8">
                                  <h1 className="title">List of {this.props.data.user.name}</h1>
                                </div>
                                <div className="column is-4">
                                  <CopyListUrl userId={this.props.data.user.id} />
                                </div>
                              </div>
                            </div>
                        </div>
                        <div>
                            <Thumbnails ref={this.thumbnails} movies={this.state.movies} usermovies={this.props.usermovies} data={this.props.data} />
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={this.state.pageCount}
                                offset={this.state.offset}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                parent={this}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
