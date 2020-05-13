import React, {Component} from 'react'
import PropTypes from 'prop-types'


class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  }

  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render(){

    //destructure this.state.query
    const { query } = this.state
    
    //destructure this.props.contacts
    const { contacts, onDeleteContact, onNavigate } = this.props

    //now we want to filter our contact to whatever we put in the input field.
    // showingContacts is what we'll show now, not 'contacts' formerly mapped over 
    // in the ol component below.

    const showingContacts =
      query === ''? contacts : contacts.filter(c => (
        c.name.toLowerCase().includes(query.toLowerCase())
      ))

    return (
      <div className="list-contacts">
      
        <div className="list-contacts-top">
          <input className ='search-contacts'
                 type="text"
                 placeholder="Search Contacts"
                 //set it to the same as the query state
                 value={query}
                 onChange={(event) => this.updateQuery(event.target.value)}    
          />
          <a href="#create" 
             onClick={onNavigate} 
             className="add-contact"
          >Add Contact
          </a>
        </div>
        {/* GUARD UP OPERATOR */}
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} 
                  of {contacts.length} contacts
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className='contact-list'>
              {showingContacts.map( contact => (
                <li key={ contact.id } className='contact-list-item'>
                  <div className='contact-avatar' 
                      style={{ backgroundImage: `url(${contact.avatarURL})` 
                      }}
                  >
                  </div>
                  <div className="contact-details">
                    <p>{ contact.name }</p>
                    <p>{ contact.handle }</p>
                  </div>
                  <button className="contact-remove"
                          onClick={ ()=> onDeleteContact(contact)}
                  >
                    Remove
                  </button>
                </li>
              ))}     
            </ol>
          </div>  
    )
  }
}

export default ListContacts

