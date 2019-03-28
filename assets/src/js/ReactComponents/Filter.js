import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          name : "filter-" + props.name,
          filterClass : "checkbox" + this.props.name,
      }
      
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.handleFilterSort = this.handleFilterSort.bind(this);
    }

    /**
     * Open menu edition for the filter
     * @param {*} menu 
     */
    toggleActivation(menu) {
        var node = document.getElementById(menu.currentTarget.value);
        node.classList.toggle('is-active');
    }

    /**
     * Event to filter the movie list
     * @param {*} checkbox 
     */
    handleFilterChange(checkbox) {
        this.props.onChange(this.props.id, checkbox.currentTarget.value);
    }

    /**
     * Event to sort the movie list
     * @param {*} button 
     */
    handleFilterSort(button) {
        this.props.onClick(this.props.id, button.currentTarget.value, this.props.type);
    }

    render() {
        return (
            <div className="level-item has-text-centered">
                <div className="field has-addons">
                    <div className="control">
                        <button className="button is-info" onClick={this.handleFilterSort} value="ASC">
                            <span className="icon">
                                <i className="fas fa-arrow-up"></i>
                            </span>
                        </button>
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
                                        let keyItem = "filterItem" + filterName;
                                        let keyInput = "filterInput" + filterName;
                                        let keyLabel = "filterLabel" + filterName;
                                        let filterClass = "is-checkradio checkbox" + this.props.name;
                                        return <div className="dropdown-item"  key={keyItem}>
                                                <input className={filterClass} id={filterName} value={filter.pk} onChange={this.handleFilterChange} key={keyInput} type="checkbox" name={filter.fields.name} />
                                                <label htmlFor={filterName} key={keyLabel} >{filter.fields.name}</label>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-info"  onClick={this.handleFilterSort} value="DES">
                            <span className="icon">
                                <i className="fas fa-arrow-down"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
