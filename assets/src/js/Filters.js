import React from 'react';
import Filter from './Filter.js';
import FilterRuntime from './FilterRuntime.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);
 
      this.handleFiltersChange = this.handleFiltersChange.bind(this);
    }

    handleFiltersChange(filter, value, checked, type) {
        this.props.onChange(filter, value, checked, type);
    }

    filterState()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} id="state" name="States" type="state" filters={this.props.data.states} />;
        }
    }

    filterTypes()
    {
        if (this.props.data.types.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} id="type" name="Types" type="number" filters={this.props.data.types} />;
        }
    }

    filterGenres()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} id="genres" name="Genres" type="list" filters={this.props.data.genres} />;
        }
    }

    filterDirector()
    {
        if (this.props.data.people.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} id="director" name="Directors" type="number" filters={this.props.data.people} />;
        }
    }

    filterScenarists()
    {
        if (this.props.data.people.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} id="scenarist" name="Scenarists" type="list" filters={this.props.data.people} />;
        }
    }

    filterActors()
    {
        if (this.props.data.people.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} id="actors" name="Actors" type="list" filters={this.props.data.people} />;
        }
    }

    filterRuntime()
    {
        if (this.props.data.movies.length > 0)
        {
            return <FilterRuntime  id="runtime" name="Runtime" type="runtime" filters={this.props.data.people} />;
        }
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <nav className="level">
                        {this.filterState()}
                        {this.filterTypes()}
                        {this.filterGenres()}
                        {this.filterRuntime()}
                        {this.filterDirector()}
                        {this.filterScenarists()}
                        {this.filterActors()}
                    </nav>
                </div>
            </section>
        );
    }    
}