import React from 'react';
import Search from './Search.js';
import Filters from './Filters.js';
import ListMovie from './ListMovie.js';

export default class MainComponent extends React.Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            data : JSON.parse(props.data),
            dataFiltred : JSON.parse(props.data),
        }
      //this.handleFiltersChange = this.handleFiltersChange.bind(this);
    }

    render() {
        return (
            <div>
                <Search />
                <Filters data={ this.state.data } dataFiltred={ this.state.dataFiltred } />
                <ListMovie  movies={ this.state.data.movies } genres={ this.state.data.genres } />
            </div>
        );
    }
}
