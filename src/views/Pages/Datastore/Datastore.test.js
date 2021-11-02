import React from 'react';
import ReactDOM from 'react-dom';
import Datastore from './Datastore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Datastore />, div);
  ReactDOM.unmountComponentAtNode(div);
});
