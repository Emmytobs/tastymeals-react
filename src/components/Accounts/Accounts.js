import React from 'react'
import { Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import Login from './Login/Login'
import Register from './Register/Register'

function Accounts(props) {
    const { url } = useRouteMatch();
    return (
        <Switch>
            <Route path={url} exact>
                <Redirect to={`${url}/login`} />
            </Route>
            <Route path={`${url}/login`} exact component={Login} {...props} />
            <Route path={`${url}/register`} exact component={Register} {...props} />
        </Switch>
    )
}

export default Accounts