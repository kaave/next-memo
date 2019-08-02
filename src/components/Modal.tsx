import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '~/hooks/usePortal';

const Modal: React.FC = ({ children }) => {
  const target = usePortal('js-modal');
  return createPortal(children, target);
};

export default Modal;
