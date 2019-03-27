import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleSubmitMovie = this.handleSubmitMovie.bind(this);
        this.handleSubmitID = this.handleSubmitID.bind(this);
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    handleChangeYear(event) {
        this.setState({year: event.target.value});
    }

    handleChangeID(event) {
        this.setState({id: event.target.value});
    }

    handleSubmitID(event) {
        event.preventDefault();
        if (this.state.id !== '') {
            window.location.href = `../../search?i=${this.state.id}`;
        }
    }

    handleSubmitMovie(event) {
        event.preventDefault();
        if (this.state.title !== '' && this.state.year !== '') {
            window.location.href = `../../search?title=${encodeURI(this.state.title)}&year=${encodeURI(this.state.year)}`;
        } else if (this.state.title !== '') {
            window.location.href = `../../search?title=${encodeURI(this.state.title)}`;
        }

    }


    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification">
                        <h1 className="title">Search a movie</h1>
                        <form onSubmit={this.handleSubmitMovie}>
                            <div className="field is-grouped">

                                <div className="control is-expanded">
                                    <input className="input" type="text" value={this.state.title}
                                           onChange={this.handleChange} placeholder="Title*" required/>
                                </div>
                                <div className="control">
                                    <input className="input" type="number" value={this.state.year}
                                           onChange={this.handleChangeYear} placeholder="Year"/>
                                </div>
                                <div className="control">
                                    <button type="submit" className="button is-info">
                                        Search
                                    </button>
                                </div>

                            </div>
                        </form>
                        <div className="is-divider" id="search-divider" data-content="OR"></div>
                        <form onSubmit={this.handleSubmitID}>
                            <div className="field is-grouped">
                                <div className="control is-expanded">
                                    <input className="input" type="text" value={this.state.id}
                                           onChange={this.handleChangeID} placeholder="ID"/>
                                </div>
                                <div className="control">
                                    <button type="submit" className="button is-info">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default Search;
