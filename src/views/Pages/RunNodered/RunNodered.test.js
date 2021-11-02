import React from 'react';
import ReactDOM from 'react-dom';
import RunNodered from './RunNodered';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RunNodered />, div);
  ReactDOM.unmountComponentAtNode(div);
});
