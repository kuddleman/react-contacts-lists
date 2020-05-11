import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
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
        Hello World, I'm here right now!
        <ListContacts contacts={ this.state.contacts } 
                      onDeleteContact={ this.removeContact }
        />
      </div>
    );
  }
}

export default App;
