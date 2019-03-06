import React from 'react';

class AddToListButton extends React.Component
{

    constructor(props)
    {
      super(props);
      this.state = {
        isInList : props.isInList
      };
    }

    render()
    {
      if(!this.state.isInList)
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
      fetch(`/list/add/${this.props.movieId}`, {method: 'DELETE'})
      .then((response) => {
          if (response.status !== 200)
          {
            console.log(`Error in adding to list - response code : ${response.status}`);
            return;
          }

          this.setState({isInList : !this.state.isInList});
        }
      )
      .catch((err) => {
        console.log('Error in adding to list 2');
      });
    }

    removeFromList()
    {
      fetch(`/list/remove/${this.props.movieId}`, {method: 'DELETE'})
      .then((response) => {
          if (response.status !== 200)
          {
            console.log(`Error in removing from list - response code : ${response.status}`);
            return;
          }

          this.setState({isInList : !this.state.isInList});
        }
      )
      .catch((err) => {
        console.log('Error in adding to list 2');
      });
    }
}

export default AddToListButton;
