import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        window.location.href = `../../movie/search/${this.state.value}`;
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification">
                        <h1 className="title">Recherche de film</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field is-grouped">

                                <div className="control is-expanded">
                                    <input className="input" type="text" value={this.state.value}
                                           onChange={this.handleChange} placeholder="Titre"/>
                                </div>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Année"/>
                                </div>
                                <div className="control">
                                    <button type="submit" className="button is-info">
                                        Rechercher
                                    </button>
                                </div>

                            </div>
                        </form>
                        <div className="is-divider" id="search-divider" data-content="OR"></div>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="ID"/>
                            </div>
                            <div className="control">
                                <a className="button is-info">
                                    Rechercher
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Search;