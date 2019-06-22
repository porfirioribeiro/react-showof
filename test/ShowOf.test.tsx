import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ShowOf } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShowOf when duration={300} render={() => null} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
