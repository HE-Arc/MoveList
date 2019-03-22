import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="notification">
                        <h1 className="title">Search a movie</h1>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Title" />
                            </div>
                            <div className="control">
                                <a className="button is-info">
                                    Search
                                </a>
                            </div>
                        </div>
                        <div className="is-divider" id="search-divider" data-content="OR"></div>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="ID" />
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
