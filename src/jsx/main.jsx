import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import Router from './router';
import thunk from 'redux-thunk';
import '../styles/main.scss';

const init = {
  data: {}
};
const store = createStore(reducer, init, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('container')
);
