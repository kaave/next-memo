import * as React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import DefaultLayout from '~/layouts/default';

const Signin: NextPage = () => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onButtonClick = async () => {
    const result = await axios.post(
      '/api/v1/signin',
      { name, password },
      { headers: { 'Content-Type': 'application/json' } },
    );
    console.log(result);
  };

  return (
    <DefaultLayout>
      name: {name}
      <br />
      password: {password}
      <form>
        name: <input type="text" value={name} onChange={event => setName(event.currentTarget.value)} />
        password: <input type="password" value={password} onChange={event => setPassword(event.currentTarget.value)} />
        <button type="button" onClick={onButtonClick}>
          send
        </button>
      </form>
    </DefaultLayout>
  );
};

export default Signin;
