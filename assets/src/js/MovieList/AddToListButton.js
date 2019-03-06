import React from 'react';

class AddToListButton extends React.Component
{

    constructor(props)
    {
      super(props);
      this.state = {
        listId : JSON.parse(props.listId)
      };
    }

    render()
    {
      if(this.state.listId === null)
      {
        return (
          <button className="button is-link add-to-list-btn" onClick={() => this.addToList()}>Add to my List</button>
        );
      }
      else
      {
        return (
          <button className="button is-danger add-to-list-btn" onClick={() => this.removeFromList()}>Remove from list</button>
        );
      }
    }

    addToList()
    {
      fetch(`/list/add/${this.props.movieId}/`, {method: 'POST', headers: this.getHeaders()})
      .then((response) => {
          if (response.status !== 200)
          {
            console.log(`Error in adding to list - response code : ${response.status}`);
            return;
          }

          this.setState({listId : response.listId});
        }
      )
      .catch((error) => {
        console.log(error);
      });
    }

    removeFromList()
    {
      fetch(`/list/remove/${this.props.movieId}/`, {method: 'DELETE', headers: this.getHeaders()})
      .then((response) => {
          if (response.status !== 204)
          {
            console.log(`Error in removing from list - response code : ${response.status}`);
            return;
          }

          this.setState({listId : null});
        }
      )
      .catch((error) => {
        console.log(error);
      });
    }

    getHeaders()
    {
      return {"X-CSRFToken": this.props.csrf};
    }
}

export default AddToListButton;
