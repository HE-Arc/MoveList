import React from 'react';

class Filter extends React.Component {
    toggleActivation(e)
    {
        var node = document.getElementById("filter-" + e.currentTarget.value);
        node.classList.toggle('is-active');
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <nav className="level">
                        <div className="level-item has-text-centered">
                            <div className="field has-addons">
                                <div className="control">
                                    <a className="button is-info">
                                        <span className="icon">
                                            <i className="fas fa-arrow-up"></i>
                                        </span>
                                    </a>
                                </div>
                                <div className="control">
                                    <div id="filter-genre" className="dropdown">
                                        <div className="dropdown-trigger">
                                            <button className="button" aria-haspopup="true" value="genre" aria-controls="dropdown-menu" onClick={this.toggleActivation}>
                                                <span>Genre</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-pen" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <div className="dropdown-item">
                                                    <input className="is-checkradio" id="Horror" type="checkbox" name="Horror" />
                                                    <label htmlFor="Horror">Horror</label>
                                                </div>
                                                <div className="dropdown-item">
                                                    <input className="is-checkradio" id="Comedy" type="checkbox" name="Comedy" />
                                                    <label htmlFor="Comedy">Comedy</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="control">
                                    <a className="button is-info">
                                        <span className="icon">
                                            <i className="fas fa-arrow-down"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div className="field has-addons">
                                <div className="control">
                                    <a className="button is-info">
                                        <span className="icon">
                                            <i className="fas fa-arrow-up"></i>
                                        </span>
                                    </a>
                                </div>
                                <div className="control">
                                    <div id="filter-year" className="dropdown">
                                        <div className="dropdown-trigger">
                                            <button className="button" value="year" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggleActivation}>
                                                <span>Year</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-pen" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <div className="dropdown-item">
                                                    <input className="is-checkradio" id="2019" type="checkbox" name="2019" />
                                                    <label htmlFor="2019">2019</label>
                                                </div>
                                                <div className="dropdown-item">
                                                    <input className="is-checkradio" id="2018" type="checkbox" name="2018" />
                                                    <label htmlFor="2018">2018</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="control">
                                    <a className="button is-info">
                                        <span className="icon">
                                            <i className="fas fa-arrow-down"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="level-item has-text-centered">
                            <div className="field has-addons">
                                <div className="control">
                                    <a className="button is-info">
                                        <span className="icon">
                                            <i className="fas fa-arrow-up"></i>
                                        </span>
                                    </a>
                                </div>
                                <div className="control">
                                    <div id="filter-released" className="dropdown">
                                        <div className="dropdown-trigger">
                                            <button className="button" value="released" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggleActivation}>
                                                <span>Released</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-pen" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <div className="dropdown-item">
                                                    <input className="is-checkradio" id="2019" type="checkbox" name="2019" />
                                                    <label htmlFor="2019">2019</label>
                                                </div>
                                                <div className="dropdown-item">
                                                    <input className="is-checkradio" id="2018" type="checkbox" name="2018" />
                                                    <label htmlFor="2018">2018</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="control">
                                    <a className="button is-info">
                                        <span className="icon">
                                            <i className="fas fa-arrow-down"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        );
    }    
}
export default Filter;