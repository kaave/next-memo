import React, { useState, useCallback } from 'react';

export type Props = {
  onChange: (state: boolean) => void;
};

const Toggle: React.FC<Props> = ({ onChange }) => {
  const [state, setState] = useState<boolean>(false);
  const onClick = useCallback(() => {
    setState(previousState => !previousState);
    onChange(!state);
  }, [onChange, state]);

  return (
    <button type="button" onClick={onClick} data-testid="toggle">
      {state ? 'Turn off' : 'Turn on'}
    </button>
  );
};

export default Toggle;
