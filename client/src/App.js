import React, { useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'

import Navbar from './components/dumb/Navbar';
import Footer from './components/dumb/Footer'
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Routes from './routing/Routes';

function App() {

  useEffect(() => {
    M.AutoInit();
    store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route component={Routes} />
        </Switch>
        <Footer />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
