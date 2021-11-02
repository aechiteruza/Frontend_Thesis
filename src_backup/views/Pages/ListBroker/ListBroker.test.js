import React from 'react';
import ReactDOM from 'react-dom';
import ListBroker from './ListBroker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListBroker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
