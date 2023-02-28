import React, { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './Сontacts/Сontacts';
import contacts from './contacts.json';
import { Filter } from './Filter/filter';
import { Container, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const saveContact = localStorage.getItem('contacts');
    if (saveContact !== null) {
      const parseContact = JSON.parse(saveContact);
      this.setState({ contacts: parseContact });
      return;
    }
    this.setState({ contacts });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    this.state.contacts.filter(
      contact =>
        contact.name === newContact.name || contact.number === newContact.number
    ).length
      ? alert(`${newContact.name}: is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  filterContacts = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  onFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filterContacts;
  };

  render() {
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onAddContact={this.addContact} />
        <Title>Contacts</Title>
        <Filter value={this.state.filter} onChange={this.filterContacts} />
        <ContactList
          contacts={this.onFilterContacts()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
