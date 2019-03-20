import React from 'react';
import Filter from './Filter.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        dataFiltred : props.dataFiltred,
      }
      console.log(typeof(this.props.data.genres));
      this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange(filter, value) {
        // this.state[filter] = value; 
    }

    filterGenres()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFilterChange} id="genresFiltred" name="Genres" filters={this.props.data.genres} dataFiltred={this.props.dataFiltred} />;
        }
    }

    filterCountrys()
    {
        if (this.props.data.countrys.length > 0)
        {
            return <Filter  onChange={this.handleFilterChange} id="countrysFiltred" name="Countrys" filters={this.props.data.countrys} dataFiltred={this.props.dataFiltred} />;
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