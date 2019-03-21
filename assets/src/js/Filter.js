import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          name : "filter-" + props.name
      }
      
      this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    toggleActivation(e) {
        var node = document.getElementById(e.currentTarget.value);
        node.classList.toggle('is-active');
    }

    handleFilterChange(checkbox) {
        this.props.onChange(this.props.id, checkbox.currentTarget.value, checkbox.currentTarget.checked, this.props.type);
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
                                        let filterName = this.props.name + filter.pk;
                                        let keyItem = "filterItem" + filter.pk;
                                        let keyInput = "filterInput" + filter.pk;
                                        let keyLabel = "filterLabel" + filter.pk;

                                        return <div className="dropdown-item"  key={keyItem}>
                                                <input className="is-checkradio" id={filterName} value={filter.pk} onChange={this.handleFilterChange} key={keyInput} type="checkbox" name={filter.fields.name} defaultChecked />
                                                <label htmlFor={filterName} key={keyLabel} >{filter.fields.name}</label>
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
