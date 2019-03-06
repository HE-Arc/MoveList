import React from 'react';
import Search from './Search.js';
import Filter from './Filter.js';
import ListMovie from './ListMovie.js';

class MainComponent extends React.Component {
    constructor(props)
    {
      super(props);
    }

    render() {
        return (
            <div>
                <Search />
                <Filter />
                <ListMovie  movies={ this.props.movies } />
            </div>
        );
    }
}

export default MainComponent;
