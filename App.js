import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import Store from './redux/configureStore';

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
}
