import React from 'react';
import Search from './search.js';
import Filter from './filter.js';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Search />
                <Filter />
            </div>
        );
    }    
}

export default Main;