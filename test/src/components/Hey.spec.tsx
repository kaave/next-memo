import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import Hey from '~/components/for-test/Hey';

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
    // こう書くとSnapshotから勝手に入れ込んでくれるのでDOMの変更があるかどうかのテストが楽
    // コンポーネント変更したら当然エラーになるので、そのときは直せばいい
    // expect(pretty(container.innerHTML)).toMatchInlineSnapshot();
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"<span>Hey, stranger!</span>"`);

    act(() => {
      render(<Hey name="Jenny" />, container);
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"<h1>Hello, Jenny!</h1>"`);

    act(() => {
      render(<Hey name="Margaret" />, container);
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"<h1>Hello, Margaret!</h1>"`);
  });
});
