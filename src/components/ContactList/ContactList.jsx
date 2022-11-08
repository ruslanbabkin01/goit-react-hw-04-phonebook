import PropTypes from 'prop-types';
import { Contacts, TotalContacts } from './ContactList.styled';
import { ContactItem } from '../ContactItem/ContactItem';

export const ContactList = ({ contacts, onDeleteContact, totalContscts }) => {
  return (
    <Contacts>
      {contacts.map(({ number, name, id }) => (
        <ContactItem
          key={id}
          number={number}
          name={name}
          onDeleteContact={() => onDeleteContact(id)}
        />
      ))}
      <TotalContacts>Total contacts: {totalContscts}</TotalContacts>
    </Contacts>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
  totalContscts: PropTypes.number,
};
