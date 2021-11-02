import React from 'react';
import ReactDOM from 'react-dom';
import FlowDesign from './FlowDesign';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlowDesign />, div);
  ReactDOM.unmountComponentAtNode(div);
});
