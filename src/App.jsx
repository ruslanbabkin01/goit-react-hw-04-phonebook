import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { ContactForm, ContactList, Filter } from './components/index';
import { Box } from './styles/index';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const currentName = name;
    const matchName = this.state.contacts.some(
      ({ name }) => name === currentName
    );

    matchName
      ? Notify.info(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const { addContact, changeFilter, deleteContact, getVisibleContacts } =
      this;
    const visibleContacts = getVisibleContacts();
    const totalContscts = contacts.length;

    return (
      <Box mx="auto" width="300px">
        <Box as="h1" fontSize={30}>
          Phonebook
        </Box>
        <ContactForm onSubmit={addContact} />
        <Box as="h2" fontSize={24}>
          Contacts
        </Box>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          onDeleteContact={deleteContact}
          contacts={visibleContacts}
          totalContscts={totalContscts}
        />
      </Box>
    );
  }
}
