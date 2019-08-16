import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import Hello from '~/components/Hello';

const components = storiesOf('Components', module);
components
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  .addParameters({
    backgrounds: [{ name: 'twitter', value: '#00aced', default: true }, { name: 'facebook', value: '#3b5998' }],
  })
  .add('Hello', () => <Hello name={text('Name', 'Storybook')} />);
