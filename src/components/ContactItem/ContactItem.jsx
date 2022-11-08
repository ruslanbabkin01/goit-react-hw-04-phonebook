import PropTypes from 'prop-types';
import { Contact, Button } from './ContactItem.styled';

export const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <Contact>
      {name}: {number}
      <Button type="button" onClick={onDeleteContact}>
        Delete
      </Button>
    </Contact>
  );
};

ContactItem.propTypes = {
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
