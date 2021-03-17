import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import MainApp from './components/MainApp'
import Accounts from './components/Accounts/Accounts';

// import styles from './App.module.css'

function App() {
  return (
    <>    
    <Switch>
      <Route path="/account" component={Accounts} />
      <Route path="/app" component={MainApp} />
      {/* <ProtectedRoute path="/app" component={MainApp} /> */}
    </Switch>
    </>
  );
}

export default App;
