import React from 'react';

import styles from './style.scss';
import TagCell from '../../atoms/TagCell';

const sources: ReadonlyArray<{ label: string; id: string; value: string }> = [
  { label: 'Tab1', id: 'tab1', value: 'tab-1' },
  { label: 'Tab2', id: 'tab2', value: 'tab-2' },
  { label: 'Tab3', id: 'tab3', value: 'tab-3' },
];

const TagList: React.FC = () => {
  const [checkedIndex, setCheckedIndex] = React.useState<number | null>(null);
  const handleChange = React.useCallback(
    (val: string) => setCheckedIndex(sources.findIndex(({ value }) => value === val)),
    [],
  );

  return (
    <ul className={styles.parent}>
      {sources.map(({ label, id, value }, i) => (
        <TagCell
          key={label}
          name="tag-list"
          className={styles.cell}
          id={id}
          value={value}
          onChange={handleChange}
          checked={i === checkedIndex}
        >
          {label}
        </TagCell>
      ))}
    </ul>
  );
};

export default TagList;
