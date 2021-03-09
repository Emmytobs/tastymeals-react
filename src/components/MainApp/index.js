import React from 'react'
// import { Route, useRouteMatch } from 'react-router';

// Components under /app
import Homepage from './Homepage';
import MealDetails from './MealDetails';
import RestaurantDetails from './RestaurantDetails';

export default function MainApp() {

    // const { url } = useRouteMatch();

    return (
        <>
            {/* <Homepage /> */}
            {/* <MealDetails /> */}
            {/* <Route path={`${url}/home`} /> */}

            <RestaurantDetails />
        </>
    )
}
