import { Component } from "react";
import { ContactFilter } from "../cmps/ContactFilter";
import { ContactList } from "../cmps/ContactList";
import { connect } from 'react-redux'
import { contactService } from "../services/contact.service";
import { ContactDetails } from "./ContactDetails";
import { NavLink, withRouter } from "react-router-dom";
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'

export class _ContactIndex extends Component {

  componentDidMount() {
    console.log(this.props);
    this.props.loadContacts()
  }

  onSelectContactId = (contactId) => {
    this.setState({ selectedContactId: contactId });
  };

  onRemoveContact = async (contactId) => {
    this.props.removeContact(contactId)
  };

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy)
    this.props.loadContacts(filterBy)
  };

  render() {
    const { contacts, selectedContactId, filterBy } = this.props;
    console.log(filterBy);
    if (!contacts) return <img className="loader" src={require('../assets/imgs/loader.gif')} alt="" />;
    return (
      <section className="contact-index">
        {selectedContactId ? (
          <ContactDetails
            onBack={() => this.onSelectContactId(null)}
            contactId={selectedContactId}
          />
        ) : (
          <>
            <ContactFilter
              onChangeFilter={this.onChangeFilter}
              filterBy={filterBy}
            />
              <NavLink className={'add-contact'} to={`contact/edit/`}>Add contact</NavLink>
            <ContactList
              onRemoveContact={this.onRemoveContact}
              onSelectContactId={this.onSelectContactId}
              contacts={contacts}
            />
          </>
        )}
      </section>
    );
  }
}


const mapStateToProps = state => ({
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy,

})

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
  // spendBalance
}

export const ContactIndex = connect(mapStateToProps, mapDispatchToProps)(_ContactIndex)