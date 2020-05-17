import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    contacts: [],
    
  }

  componentDidMount() {
    ContactsAPI.getAll()
    .then( contacts => {
      this.setState(() => ({
        contacts
      }))
    } )
  }
  //removeContact must go here in this file, NOT in ListContacts
  // because the data concerned LIVES HERE in app.js
  removeContact = (contact) => {
    this.setState( currentState => ({
      contacts: currentState.contacts.filter((c)=> {
        return c.id !== contact.id
      })
    }))
    ContactsAPI.remove(contact)
  }

  


  render() {
    return (
      <div>
      
        {/* when I pass props to a specific component that
        the router is going to render, I need the render prop */}

        <Route exact path='/' render={()=>(
          <ListContacts contacts={ this.state.contacts } 
                        onDeleteContact={ this.removeContact }
                        
          />
        )} />
        <Route path='/create' component={ CreateContact } />
        { this.state.screen === 'create' && (
          <CreateContact />
          )}
      </div>
    );
  }
}

export default App;
