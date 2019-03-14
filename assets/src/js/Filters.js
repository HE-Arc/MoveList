import React from 'react';
import Filter from './Filter.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        genres : JSON.parse(props.genres),
        countrys : JSON.parse(props.countrys),
      }
    }

    filterGenres()
    {
        if (this.state.genres.length > 0)
        {
            return <Filter name="Genres" filters={this.state.genres} />;
        }
    }

    filterCountrys()
    {
        if (this.state.genres.length > 0)
        {
            return <Filter name="Countrys" filters={this.state.countrys} />;
        }
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <nav className="level">
                        {this.filterGenres()}
                        {this.filterCountrys()}
                    </nav>
                </div>
            </section>
        );
    }    
}