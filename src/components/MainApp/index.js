import React from 'react'
import { Route, useRouteMatch, Switch } from 'react-router';

// Components under /app
import Homepage from './Homepage';
import MealDetails from './MealDetails';
import RestaurantDetails from './RestaurantDetails';
import AdminPage from '../AdminPage/AdminPage';

export default function MainApp(props) {

    const { url } = useRouteMatch();

    return (
        <>
        <Switch>
            <Route path={url} exact component={Homepage} />
            <Route path={`${url}/meal/:mealId`} exact component={MealDetails} />
            <Route path={`${url}/restaurant/:restaurantId`} exact component={RestaurantDetails} />
            <Route path={`${url}/admin`} component={AdminPage} />
        </Switch>
        </>
    )
}