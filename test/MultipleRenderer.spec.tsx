import React from 'react';
import { act as domAct } from 'react-dom/test-utils';
import { act as testAct, create, ReactTestRenderer } from 'react-test-renderer';

const App = () => <div>App</div>;

let root: ReactTestRenderer;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});

it('Multiple renderer test', () => {
  expect(root).toMatchSnapshot();
});
