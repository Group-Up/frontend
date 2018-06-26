import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app/app';
import reducer from './reducers/index';
import thunk from './lib/redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

const app = document.createElement('div');
document.body.appendChild(app);
app.classList.add('main-main-app');
render(<Provider store={ store }><App/></Provider>, app);
