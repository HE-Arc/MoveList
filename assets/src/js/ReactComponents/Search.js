import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    handleChangeYear(event) {
        this.setState({year: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.title !== '' && this.state.year !== '') {
            window.location.href = `../../search?title=${this.state.title}&year=${this.state.year}`;
        }else if(this.state.title !== ''){
            window.location.href = `../../search?title=${this.state.title}`;
        }

    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification">
                        <h1 className="title">Search a movie</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field is-grouped">

                                <div className="control is-expanded">
                                    <input className="input" type="text" value={this.state.title}
                                           onChange={this.handleChange} placeholder="Titre"/>
                                </div>
                                <div className="control">
                                    <input className="input" type="text" value={this.state.year}
                                           onChange={this.handleChangeYear} placeholder="Année"/>
                                </div>
                                <div className="control">
                                    <button type="submit" className="button is-info">
                                        Search
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
                                    Search
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
