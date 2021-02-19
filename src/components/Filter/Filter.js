import React from 'react';
import PropTypes from 'prop-types';

import './Filter.scss';

const Filter = ({ filter, changeFilterInputValue }) => {
  return (
    <>
      <label className="find-contacts__label" htmlFor="find-contacts-form__filter">
        Find contacts by name
      </label>
      <input
        type="search"
        id="find-contacts-form__filter"
        name="filter"
        className="find-contacts__input"
        value={filter}
        onChange={changeFilterInputValue}
        required
        autoComplete="off"
        autoFocus
      ></input>
    </>
  );
};

Filter.propTypes = {
  changeFilterInputValue: PropTypes.func.isRequired,
};

export default Filter;
