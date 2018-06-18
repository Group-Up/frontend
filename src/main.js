import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/app';
// import reducer from './reducers/index';

// const middleware = {};
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware)));
//
// const app = document.createElement('div');
// document.body.appendChild(app);
// render(<Provider store={ store }><App/></Provider>, app);

const app = document.createElement('div');
document.body.appendChild(app);
render(<App/>, app);
