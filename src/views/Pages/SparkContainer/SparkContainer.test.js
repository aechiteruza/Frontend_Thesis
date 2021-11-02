import React from 'react';
import ReactDOM from 'react-dom';
import SparkContainer from './SparkContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SparkContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
