import React from 'react';

export default class FilterRuntime extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          name : "filter-" + props.name
      }
      
      this.handleFilterRuntimeChange = this.handleFilterRuntimeChange.bind(this);
    }

    toggleActivation(e) {
        var node = document.getElementById(e.currentTarget.value);
        node.classList.toggle('is-active');
    }

    handleFilterRuntimeChange(inputNumber) {
        console.log(inputNumber);
        //this.props.onChange(this.props.id, checkbox.currentTarget.value, checkbox.currentTarget.checked, this.props.type);
    }

    render() {
        return (
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
                        <div id={this.state.name} className="dropdown">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" value={this.state.name} aria-controls="dropdown-menu" onClick={this.toggleActivation}>
                                    <span>{this.props.name}</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-pen" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <div className="field">
                                            <label className="label">Min</label>
                                            <div className="control">
                                                <input className="input is-small"  id="runtimeMin" onChange={this.handleFilterChange} type="number" name="runtimeMin" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="is-divider" id="search-divider"></div>
                                    <div className="dropdown-item">
                                        <div  className="field">
                                            <label className="label">Max</label>
                                            <div className="control">
                                                <input className="input is-small"  id="runtimeMax" onChange={this.handleFilterChange} type="number" name="runtimeMax" />
                                            </div>
                                        </div>
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
        );
    }    
}