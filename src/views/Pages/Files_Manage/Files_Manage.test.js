import React from 'react';
import ReactDOM from 'react-dom';
import Files_Manage from './Files_Manage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Files_Manage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
