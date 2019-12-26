import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';

it('renders without crashing', () => {
  const div = document.createElement('div');

  render(<Root />, div);
});
