import React from 'react';
import { shallow } from 'enzyme';

import Hello from '~/components/Hello';

describe('<Hello />', () => {
  it('props.nameなしだとHello! Jane Doe', () => {
    const renderer = shallow(<Hello />);
    expect(renderer.text().includes('Jane Doe')).toBeTruthy();
  });

  it('props.nameありだとHello! <わたした名前>', () => {
    const name = 'Novak Đoković';
    const renderer = shallow(<Hello name={name} />);
    expect(renderer.text().includes(name)).toBeTruthy();
  });
});
