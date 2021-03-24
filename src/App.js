import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import MainApp from './components/MainApp'
import Accounts from './components/Accounts/Accounts';


function App(props) {
  const { colorMode } = props;
  const bodyElement = document.querySelector('body');
  if (colorMode === 'dark') {
    bodyElement.classList.replace('light', colorMode);
  } else {
    bodyElement.classList.replace('dark', colorMode);    
  }

  return (
    <>    
    <Switch>
      <Route path="/" exact>
        <Redirect to="/account" />
      </Route>
      <Route path="/account" component={Accounts} />
      {/* <Route path="/app" component={MainApp} /> */}
      <ProtectedRoute path="/app" component={MainApp} />
    </Switch>
    </>
  );
}

export default connect((state) => ({ colorMode: state.colorMode }), null)(App);
