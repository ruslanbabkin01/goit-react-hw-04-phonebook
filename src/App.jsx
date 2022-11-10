import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { ContactForm, ContactList, Filter } from './components/index';
import { Box } from './styles/index';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    setContacts(parseContacts);
  }, []);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const currentName = name;
    const matchName = contacts.some(({ name }) => name === currentName);

    matchName
      ? Notify.info(`${name} is already in contacts`)
      : setContacts([newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(({ contacts }) =>
      contacts.filter(({ id }) => id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;

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
        totalContacts={totalContacts}
      />
    </Box>
  );
};
