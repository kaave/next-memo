import React from 'react';

import styles from './style.scss';

type Props = {
  className?: string;
  name: string;
  id: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
};

const TagCell: React.FC<Props> = React.memo(({ className, name, id, value, checked, onChange, children }) => {
  const handleChange = React.useCallback(() => onChange(value), [onChange, value]);

  return (
    <li className={`${styles.parent} ${className}`}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={handleChange}
        hidden
      />
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
    </li>
  );
});

export default TagCell;
