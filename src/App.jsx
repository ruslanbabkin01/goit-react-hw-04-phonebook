import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { ContactForm, ContactList, Filter } from './components/index';
import { Box } from './styles/index';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const currentName = name;
    const matchName = contacts.find(({ name }) => name === currentName);

    matchName
      ? Notify.info(`${name} is already in contacts`)
      : setContacts([newContact, ...contacts]);
  };

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  function deleteContact(contactId) {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  }

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
