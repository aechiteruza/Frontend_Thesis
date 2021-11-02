import React from 'react';
import ReactDOM from 'react-dom';
import MQTT from './MQTT';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MQTT />, div);
  ReactDOM.unmountComponentAtNode(div);
});