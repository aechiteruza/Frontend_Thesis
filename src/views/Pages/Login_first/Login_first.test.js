import React from 'react';
import ReactDOM from 'react-dom';
import Login_first from './Login_first';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login_first />, div);
  ReactDOM.unmountComponentAtNode(div);
});
