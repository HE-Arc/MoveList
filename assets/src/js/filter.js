import React from 'react';

class Filter extends React.Component {
    toggleActivation(e)
    {
        var node = document.getElementById("filter-genre");
        console.log(node);
        node.classList.toggle('is-active');
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div id="filter-genre" className="dropdown">
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggleActivation}>
                                <span>Genre</span>
                                <span className="icon is-small">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    <p>Horror</p>
                                </div>
                                <hr className="dropdown-divider" />
                                <div className="dropdown-item">
                                    <p>Comedy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }    
}
export default Filter;