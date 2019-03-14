import React from 'react';
import Search from './Search.js';
import Filters from './Filters.js';
import ListMovie from './ListMovie.js';

export default class MainComponent extends React.Component {
    constructor(props)
    {
      super(props);
    }

    render() {
        return (
            <div>
                <Search />
                <Filters genres={ this.props.genres } countrys={ this.props.countrys } />
                <ListMovie  movies={ this.props.movies } genres={ this.props.genres } />
            </div>
        );
    }
}
