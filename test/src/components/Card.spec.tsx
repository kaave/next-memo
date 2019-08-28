/* eslint-disable @typescript-eslint/ban-ts-ignore */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Card from '~/components/for-test/Card';

// いんちき宣言
jest.useFakeTimers();

describe('Card: with react-testing-library and fake timer', () => {
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

  it('should select null after timing out', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<Card onSelect={onSelect} />, container);
    });

    // move ahead in time by 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onSelect).not.toHaveBeenCalled();

    // and then move ahead by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000); // timerを5000すすめた
    });
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('should cleanup on being removed', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<Card onSelect={onSelect} />, container);
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onSelect).not.toHaveBeenCalled();

    // unmount the app
    act(() => {
      // @ts-ignore nullが…
      render(null, container);
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should accept selections', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<Card onSelect={onSelect} />, container);
    });

    act(() => {
      // @ts-ignore querySelector握りつぶし
      container.querySelector('[data-testid="2"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
