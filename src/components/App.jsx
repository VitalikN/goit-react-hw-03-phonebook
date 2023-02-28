import React, { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './Сontacts/Сontacts';
import contacts from './contacts.json';
import { Filter } from './Filter/filter';
import { Container, Title, Btn } from './App.styled';
import { Modal } from './Modal/Modal';
import { BsFillPersonPlusFill } from 'react-icons/bs';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    showModal: false,
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
    if (
      this.state.contacts.length > prevState.contacts.length &&
      prevState.contacts.length !== 0
    ) {
      this.toggleModal();
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

  //  const isExist = this.state.contacts.find(
  //       contact =>
  //         contact.name === newContact.name || contact.number === newContact.number
  //     );
  //     if (!isExist) {
  //       this.setState(prevState => ({
  //         contacts: [...prevState.contacts, newContact],
  //       }));
  //       this.toggleModal();
  //     } else {
  //       alert(`${newContact.name}: is already in contacts`);
  //       return;
  //     }

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
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { filter, showModal } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>
        <Btn type="button" onClick={this.toggleModal}>
          <BsFillPersonPlusFill />
        </Btn>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm onAddContact={this.addContact} />
          </Modal>
        )}

        <Title>Contacts</Title>
        <Filter value={filter} onChange={this.filterContacts} />
        <ContactList
          contacts={this.onFilterContacts()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
