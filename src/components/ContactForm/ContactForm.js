import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import './ContactForm.scss';

class ContactForm extends Component {
  static defaultProps = {
    name: '',
    number: '',
  };

  state = {
    name: this.props.name,
    number: this.props.number,
  };

  onFormSubmit = event => {
    event.preventDefault();
    const names = this.props.contacts.map(contact => contact.name);
    if (names.includes(this.state.name)) {
      alert(`${this.state.name} is already in contacts.`);
    } else {
      const contact = { id: uuidv4(), name: this.state.name, number: this.state.number };
      this.props.handleFormSubmit(contact);
    }
    this.formReset();
  };

  changeInputValue = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formReset = () => this.setState({ name: '', number: '' });

  render() {
    return (
      <form className="Phonebook__form" onSubmit={this.onFormSubmit}>
        <label htmlFor="Phonebook-form__name">Name</label>
        <input
          type="text"
          id="Phonebook-form__name"
          name="name"
          value={this.state.name}
          onChange={this.changeInputValue}
          required
          autoComplete="off"
        ></input>
        <label htmlFor="Phonebook-form__number">Number</label>
        <input
          type="tel"
          id="Phonebook-form__number"
          name="number"
          value={this.state.number}
          onChange={this.changeInputValue}
          required
          autoComplete="off"
          pattern="^[ 0-9]+$"
        ></input>
        <button className="btn" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
