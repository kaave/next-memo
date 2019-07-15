import { State } from './types';

type EvenOrOdd = 'even' | 'odd';

export const evenOrOdd: (state: State) => EvenOrOdd = ({ count }) => (count % 2 === 0 ? 'even' : 'odd');
