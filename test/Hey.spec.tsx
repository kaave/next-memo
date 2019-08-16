import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Hey from '~/components/Hey';

describe('Hey with react-testing-library', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
      (container as any) = null; // TODO: 毎回必要のないnullチェックするよりはここでインチキ
    }
  });

  it('renders with or without a name', () => {
    act(() => {
      // render components in this closure
      render(<Hey />, container);
    });
    expect(container.textContent).toBe('Hey, stranger');

    act(() => {
      render(<Hey name="Jenny" />, container);
    });
    expect(container.textContent).toBe('Hello, Jenny!');

    act(() => {
      render(<Hey name="Margaret" />, container);
    });
    expect(container.textContent).toBe('Hello, Margaret!');
  });
});
