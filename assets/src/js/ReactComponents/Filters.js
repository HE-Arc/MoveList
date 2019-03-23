import React from 'react';
import Filter from './Filter.js';
import FilterRuntime from './FilterRuntime.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);

      this.handleFiltersChange = this.handleFiltersChange.bind(this);
      this.handleFiltersSort = this.handleFiltersSort.bind(this);
    }

    handleFiltersChange(filter, value, checked, type, nbChecked, previousNbChecked) {
        this.props.onChange(filter, value, checked, type, nbChecked, previousNbChecked);
    }

    handleFiltersSort(filter, value, type) {
        this.props.onClick(filter, value, type);
    }

    filterState()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="state" name="States" type="state" filters={this.props.data.states} />;
        }
    }

    filterTypes()
    {
        if (this.props.data.types.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="type" name="Types" type="number" filters={this.props.data.types} />;
        }
    }

    filterGenres()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="genres" name="Genres" type="list" filters={this.props.data.genres} />;
        }
    }

    filterDirector()
    {
        if (this.props.data.people.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="director" name="Directors" type="number" filters={this.props.data.people} />;
        }
    }

    filterScenarists()
    {
        if (this.props.data.people.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="scenarists" name="Scenarists" type="list" filters={this.props.data.people} />;
        }
    }

    filterActors()
    {
        if (this.props.data.people.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="actors" name="Actors" type="list" filters={this.props.data.people} />;
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
            <section className="section filters">
                <h3 className="title">Filters</h3>
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
