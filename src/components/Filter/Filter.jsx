import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Filter/filter.module.css';

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={styles.Filter}>
      Find contacts by name
      <input
        className={styles.FilterInput}
        type="text"
        value={value}
        onChange={e => onChangeFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
