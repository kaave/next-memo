/** @jsx jsx */

// import * as React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

export type Props = {
  name?: string;
  className?: string;
};

const Hello = ({ name = 'Jane Doe', className }: Props) => (
  <div className={className}>
    <span className="Hello">Hello!</span>
    <span className="Name">{name}</span>
  </div>
);

export default styled(Hello)`
  position: relative;
  font-size: 100px;
  color: hotpink;

  .Hello {
    position: relative;
    display: inline-block;
    transform: rotate(180deg);
  }

  .Name {
    position: relative;
    display: inline-block;
    transform: rotate(-90deg);
  }
`;
