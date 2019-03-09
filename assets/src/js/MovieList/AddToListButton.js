import React from 'react';

class AddToListButton extends React.Component
{

    constructor(props)
    {
      super(props);
      this.state = {
        listId : JSON.parse(props.listId),
        states : JSON.parse(props.states)
      };
    }

    render()
    {
      if(this.state.listId === null)
      {
        return (
          <form onSubmit={(e) => this.addToList(e)}>
            <div className="field">
              <div className="select is-fullwidth">
                <select name="statePk" id="state-pk">
                  {
                    this.state.states.map((value) => {
                      return <option value={value.pk} key={value.pk}>{value.fields.name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" name="rating" type="number" min="0" max="10" step="1" placeholder="Rating" />
              </div>
              <p className="help">Maximum : 10, Minimum 0</p>
            </div>
            <button type="submit" className="button is-link add-to-list-btn">Add to my List</button>
          </form>
        );
      }
      else
      {
        return (
          <button className="button is-danger add-to-list-btn" onClick={() => this.removeFromList()}>Remove from my list</button>
        );
      }
    }

    addToList(event)
    {
      event.preventDefault();
      fetch(`/list/add/${this.props.movieId}/`, {
        method: 'POST',
        headers: this.getHeaders(),

        body: JSON.stringify({
          state: event.target.statePk.value,
          rating: event.target.rating.value == "" ? null : event.target.rating.value
        })
      }).then((response) => {
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

    getTypesForSelect()
    {

    }
}

export default AddToListButton;
