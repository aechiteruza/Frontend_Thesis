import React from 'react';
import ReactDOM from 'react-dom';
import Createdatabase from './Createdatabase';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Createdatabase />, div);
  ReactDOM.unmountComponentAtNode(div);
});
