import React, { Component } from 'react';
import axios from 'axios'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  state = { 
    shelfitems: [],
    description: '', 
    url: '' ,
  }

  componentDidMount() {
    this.getShelfItems()
  }

  getShelfItems = () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    axios.get(`/api/shelf`, config)
      .then((response) => {
        console.log(response)
        this.setState({
          shelfitems: response.data
        })

      }).catch((error) => {
        alert('Bad things happened...')
        console.log('Error in get /api/shelf', error)
      })
  }

  handleChange = (event, name) => {
    console.log( 'got change', name, event.target.value );
    this.setState({
      ...this.state,
      [ name ]: event.target.value,
    })
  }

  handleClick = (event) => {
    console.log( 'Got click on add item', this.state )
    axios.post( '/api/shelf', this.state)
      .then( (response) => {
        console.log( response );
        this.setState({
          ...this.state,
          description: '',
          url: '',
        })
      })
      .catch( (error) => {
        console.log( 'Error adding to shelf', error )
      })
  }
  
  deleteBtn = (item) => {
    console.log('in deleteBtn', item.id);
    axios.delete(`/api/shelf/${item.id}`)
    .then(response => {
      console.log('response is', response)
      this.getShelfItems()
    });
  }

  render() { 
    return ( 
      <div>
        <p>Shelf Items:</p>
        {this.state.shelfitems.map( item => (
          <div width="500px" height="600px" margin="auto" key={item.id}>
            <img src={item.image_url} alt={item.id} width="500px" height="500px"></img>
            <h3>{item.description} --- <button name={item.id} onClick={() => this.deleteBtn(item)}>Delete</button></h3>
            
          </div>
        ))
      }
        <form>
          <label>Description:</label><input type='text' onChange={ (event) => this.handleChange(event, 'description')}></input>
          <label>URL:</label><input type='text' onChange={ (event) => this.handleChange(event, 'url')}></input>
          <button onClick={ (event) => this.handleClick(event) }>Add Item</button>
        </form>
      </div>
     );
  }
}
 
export default InfoPage;
