import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

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

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
  }, [contacts]);

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
