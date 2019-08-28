import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

import User from '~/components/for-test/User';

describe('User with react-testing-library', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    (container as any) = null; // TODO: 毎回必要のないnullチェックするよりはここでインチキ
  });

  it('renders user data', async () => {
    const fakeUser = {
      name: 'Joni Baez',
      age: '32',
      address: '123, Charming Avenue',
    };

    const spiedAxiosGet = jest.spyOn(axios, 'get');
    spiedAxiosGet.mockImplementation(() =>
      Promise.resolve({
        data: () => fakeUser,
      }),
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<User id="123" />, container);
    });

    expect((container.querySelector('summary') as HTMLElement).textContent).toBe(fakeUser.name);
    expect((container.querySelector('strong') as HTMLElement).textContent).toBe(fakeUser.age);
    expect(container.textContent).toContain(fakeUser.address);

    // remove the mock to ensure tests are completely isolated
    spiedAxiosGet.mockRestore();
  });
});
