import React from 'react';

export default class Filter extends React.Component {
    constructor(props)
    {
      super(props);

      this.state = {
          filters : props.filters,
          name : "filter-" + props.name
      }

      this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    toggleActivation(e)
    {
        var node = document.getElementById(e.currentTarget.value);
        node.classList.toggle('is-active');
    }

    handleFilterChange(checkbox) {
        console.log(this.state.filters);
        if (checkbox.currentTarget.checked)
        {
            this.state.filters.push(checkbox.currentTarget.value);
        } else {
            this.state.filters.splice(this.state.filters.indexOf(checkbox.currentTarget.value),1);
        }
        console.log(this.state.filters);
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
                                    { this.state.filters.map((filter) => {
                                        let keyItem = "filterItem" + filter.pk;
                                        let keyInput = "filterInput" + filter.pk;
                                        let keyLabel = "filterLabel" + filter.pk;
                                        
                                        return <div className="dropdown-item"  key={keyItem}>
                                                <input className="is-checkradio" value={filter} id={filter.fields.name} value={filter.fields.name} onChange={this.handleFilterChange} key={keyInput} type="checkbox" name={filter.fields.name} defaultChecked />
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