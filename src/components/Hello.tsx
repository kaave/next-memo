import * as React from 'react';

export type Props = {
  name?: string;
};

export default ({ name = 'Jane Doe' }: Props) => <div>Hello! {name}</div>;
