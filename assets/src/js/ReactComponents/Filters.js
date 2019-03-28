import React from 'react';
import Filter from './Filter.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);

      this.handleFiltersChange = this.handleFiltersChange.bind(this);
      this.handleFiltersSort = this.handleFiltersSort.bind(this);
    }

    /**
     * Propagate the event filter to the parent
     * @param {*} filter 
     * @param {*} value 
     */
    handleFiltersChange(filter, value) {
        this.props.onChange(filter, value);
    }

    /**
     * Propagate the event sort to the parent
     * @param {*} filter 
     * @param {*} value 
     * @param {*} type 
     */
    handleFiltersSort(filter, value, type) {
        this.props.onClick(filter, value, type);
    }

    /**
     * Filter component for the states
     */
    filterState()
    {
        if (this.props.data.state.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="state" name="States" type="state" filters={this.props.data.state} />;
        }
    }

    /**
     * Filter component for the types
     */
    filterTypes()
    {
        if (this.props.data.type.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="type" name="Types" type="number" filters={this.props.data.type} />;
        }
    }

    /**
     * Filter component for the genres
     */
    filterGenres()
    {
        if (this.props.data.genres.length > 0)
        {
            return <Filter onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="genres" name="Genres" type="list" filters={this.props.data.genres} />;
        }
    }

    /**
     * Filter component for the directors
     */
    filterDirector()
    {
        if (this.props.data.director.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="director" name="Directors" type="number" filters={this.props.data.director} />;
        }
    }

    /**
     * Filter component for the scenarists
     */
    filterScenarists()
    {
        if (this.props.data.scenarists.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="scenarists" name="Scenarists" type="list" filters={this.props.data.scenarists} />;
        }
    }

    /**
     * Filter component for the actors
     */
    filterActors()
    {
        if (this.props.data.actors.length > 0)
        {
            return <Filter  onChange={this.handleFiltersChange} onClick={this.handleFiltersSort} id="actors" name="Actors" type="list" filters={this.props.data.actors} />;
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
                        {this.filterDirector()}
                        {this.filterScenarists()}
                        {this.filterActors()}
                    </nav>
                </div>
            </section>
        );
    }
}
