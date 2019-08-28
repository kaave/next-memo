import React, { useEffect } from 'react';

export type Props = {
  onSelect: (key: number | null) => void;
};

const TIMER_MSEC = 5000;
const Card: React.FC<Props> = ({ onSelect }) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => onSelect(null), TIMER_MSEC);

    return () => clearTimeout(timeoutID);
  }, [onSelect]);

  return (
    <>
      {[1, 2, 3, 4].map(choice => (
        <button key={choice} type="button" data-testid={choice} onClick={() => onSelect(choice)}>
          {choice}
        </button>
      ))}
    </>
  );
};

export default Card;
