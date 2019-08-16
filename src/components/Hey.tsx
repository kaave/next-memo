import React from 'react';

const Hey: React.FC<{ name?: string }> = ({ name }) => (name ? <h1>Hello, {name}!</h1> : <span>Hey, stranger</span>);

export default Hey;
