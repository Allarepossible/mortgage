import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux'

import 'react-vis/dist/style.css';
import Root from './Root';
import reducers from './reducers'

const store = createStore(reducers)

render(
  <Root store={store} />,
  document.getElementById('root')
);
