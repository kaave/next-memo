import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Toggle from '~/components/for-test/Toggle';

describe('Toggle button with react-testing-library and event', () => {
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

  it('changes value when clicked', () => {
    const onChange = jest.fn();
    act(() => {
      render(<Toggle onChange={onChange} />, container);
    });

    // get ahold of the button element, and trigger some clicks on it
    const button = document.querySelector('[data-testid="toggle"]');
    if (!button) throw new Error('Not found [data-testid="toggle"]');

    expect(button.innerHTML).toBe('Turn on');

    const event = new MouseEvent('click', { bubbles: true });
    act(() => {
      button.dispatchEvent(event);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe('Turn off');

    act(() => {
      [...Array(5).keys()].forEach(i => {
        button.dispatchEvent(event);
      });
    });

    expect(onChange).toHaveBeenCalledTimes(6);
    expect(button.innerHTML).toBe('Turn on');
  });
});
