/* eslint-disable @typescript-eslint/ban-ts-ignore */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Contact from '~/components/Contact';
import { Props as MapProps } from '~/components/Map';

jest.mock('~/components/Map', () => ({ center }: MapProps) => (
  <div data-testid="map">
    {center.lat}:{center.long}
  </div>
));

describe('Contact with react-testing-library and mock', () => {
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

  it('should render contact information', () => {
    const center = { lat: 0, long: 0 };
    act(() => {
      render(<Contact name="Joni Baez" email="test@example.com" site="http://test.com" center={center} />, container);
    });

    // @ts-ignore
    expect(container.querySelector("[data-testid='email']").getAttribute('href')).toEqual('mailto:test@example.com');
    // @ts-ignore
    expect(container.querySelector('[data-testid="site"]').getAttribute('href')).toEqual('http://test.com');
    // @ts-ignore
    expect(container.querySelector('[data-testid="map"]').textContent).toEqual('0:0');
  });
});
