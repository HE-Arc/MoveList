import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          filters : JSON.parse(JSON.stringify(props.filters)), // depth copy
          name : "filter-" + props.name
      }

      this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    toggleActivation(e) {
        var node = document.getElementById(e.currentTarget.value);
        node.classList.toggle('is-active');
    }

    handleFilterChange(checkbox) {
        let propsfilter = this.props.filters.filter(filter => filter.pk == checkbox.currentTarget.value)[0];
        let stateIndex = this.state.filters.indexOf(this.state.filters.filter(filter => filter.pk == propsfilter.pk)[0]);

        if (checkbox.currentTarget.checked) {
            this.state.filters.push(propsfilter);
        } else {
            this.state.filters.splice(stateIndex,1);
        }

        this.props.onChange(this.props.id, this.state.filters);
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
                                    { this.props.filters.map((filter) => {
                                        let keyItem = "filterItem" + filter.pk;
                                        let keyInput = "filterInput" + filter.pk;
                                        let keyLabel = "filterLabel" + filter.pk;
                                        
                                        return <div className="dropdown-item"  key={keyItem}>
                                                <input className="is-checkradio" id={filter.fields.name} value={filter.pk} onChange={this.handleFilterChange} key={keyInput} type="checkbox" name={filter.fields.name} defaultChecked />
                                                <label htmlFor={filter.fields.name} key={keyLabel} >{filter.fields.name}</label>
                                            </div>
                                        })
                                    }
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