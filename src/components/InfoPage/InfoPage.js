import React, { Component } from 'react';
import axios from 'axios'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  state = { 
    shelfitems: []
  }

  componentDidMount() {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    axios.get(`/api/shelf`, config)
     .then( (response) => {
       console.log(response)
       this.setState({
         shelfitems: response.data
       })
       
     }).catch( (error) => {
       alert('Bad things happened...')
       console.log('Error in get /api/shelf', error)
     })
  }

     deleteBtn=(event, item)=>{
      console.log('in deleteBtn', event.target.item);
      let id = event.target.item;
      axios.delete(`/api/shelf/${id}`)
        .then(response => {
          console.log('response is', response)
        });
  }

  render() { 
    return ( 
      <div>
        <p>Shelf Items:</p>
        {this.state.shelfitems.map( item => (
          <div width="500px" height="600px" margin="auto">
            <img src={item.image_url} width="500px" height="500px"></img>
            <h3>{item.description} --- <button name={item.id} onClick={this.deleteBtn}>Delete</button></h3>
            
          </div>
        ))
      }
      </div>
     );
  }
}
 
export default InfoPage;
