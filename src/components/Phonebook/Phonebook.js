import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

import './Phonebook.scss';

//* Phonebook хуками
const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilterInputValue = event => setFilter(event.target.value);

  const handleFormSubmit = contact => setContacts([...contacts, contact]);

  const deleteContact = contactId => setContacts(prev => prev.filter(contact => contact.id !== contactId));

  return (
    <>
      <h1 className="main-title">Phonebook</h1>
      <ContactForm handleFormSubmit={handleFormSubmit} contacts={contacts} />
      <h2 className="title__contacts">Contacts</h2>
      <Filter filter={filter} changeFilterInputValue={changeFilterInputValue} />
      <ContactList contacts={contacts} filter={filter} deleteContact={deleteContact} />
    </>
  );
};

//* Phonebook классом
// import { Component } from 'react';
// class Phonebook extends Component {
//   static defaultProps = {
//     contacts: [],
//     filter: '',
//   };

//   state = {
//     contacts: this.props.contacts,
//     filter: this.props.filter,
//   };

//   componentDidMount() {
//     const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
//     localStorageContacts && this.setState({ contacts: localStorageContacts });
//     // if (localStorageContacts) { // если массив не пустой, то вернет true, если пустой, то вернет null (false)
//     //   this.setState({ contacts: localStorageContacts });
//     // }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     prevState.contacts !== this.state.contacts && localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     // if (prevState.contacts !== this.state.contacts) {
//     //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     // }
//   }

//   changeFilterInputValue = event => this.setState({ filter: event.target.value });

//   handleFormSubmit = contact => this.setState({ contacts: [...this.state.contacts, contact] });

//   deleteContact = contactId =>
//     this.setState(prevState => ({ contacts: prevState.contacts.filter(contact => contact.id !== contactId) }));

//   render() {
//     return (
//       <>
//         <h1 className="main-title">Phonebook</h1>
//         <ContactForm handleFormSubmit={this.handleFormSubmit} contacts={this.state.contacts} />
//         <h2 className="title__contacts">Contacts</h2>
//         <Filter filter={this.state.filter} changeFilterInputValue={this.changeFilterInputValue} />
//         <ContactList contacts={this.state.contacts} filter={this.state.filter} deleteContact={this.deleteContact} />
//       </>
//     );
//   }
// }

Phonebook.defaultProps = {
  contacts: [],
  filter: '',
};

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  filter: PropTypes.string,
};

export default Phonebook;
