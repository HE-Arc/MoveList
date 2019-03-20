import React from 'react';
import Filter from './Filter.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);
 
      this.handleFiltersChange = this.handleFiltersChange.bind(this);
    }

    handleFiltersChange(filter, value, checked) {
        this.props.onChange(filter, value, checked);
    }

    filterGenres()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} id="genres" name="Genres" filters={this.props.data.genres} />;
        }
    }

    filterCountrys()
    {
        if (this.props.data.countrys.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} id="countrys" name="Countrys" filters={this.props.data.countrys} dataFiltred={this.props.dataFiltred} />;
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