import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = task => {
    const searchSameName = contacts.find(contact => contact.name === task.name);

    if (searchSameName) {
      alert(`${task.name} is already in contacts`);
    } else if (task.name.length === 0) {
      alert('Fields must be filled!');
    } else {
      const contact = {
        ...task,
        id: uuidv4(),
      };

      setContacts(prevContacts => [...prevContacts, contact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = (contacts, filter) => {
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  return (
    <div>
      <h1 className="h1">Phonebook</h1>

      <ContactForm onAddContact={addContact} />

      <h2>Contacts</h2>
      {getVisibleContacts.length > 1 && (
        <Filter value={filter} onChangeFilter={changeFilter} />
      )}

      {getVisibleContacts.length > 0 && (
        <ContactList
          contacts={getVisibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  );
};

export default App;
