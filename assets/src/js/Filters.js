import React from 'react';
import Filter from './Filter.js';

export default class Filters extends React.Component {
    constructor(props)
    {
      super(props);
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <nav className="level">
                        <Filter name="Genres" filters={this.props.genres} />
                        <Filter name="Countries" filters={this.props.countries} />
                    </nav>
                </div>
            </section>
        );
    }    
}