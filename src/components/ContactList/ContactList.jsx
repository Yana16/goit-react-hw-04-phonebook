import React from 'react';
import styles from '../ContactList/contact-list.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onRemoveContact }) => (
  <ul className={styles.TaskList}>
    {contacts.map(contact => (
      <li className={styles.TaskList_item} key={contact.id}>
        {contact.name + ':' + contact.number}

        {
          <button
            className={styles.TaskList_button}
            type="button"
            name="delete"
            onClick={() => onRemoveContact(contact.id)}
          >
            delete
          </button>
        }
      </li>
    ))}
  </ul>
);

ContactList.popTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default ContactList;
