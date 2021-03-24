import React from 'react'
import { connect } from 'react-redux';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router';

// Components under /app
import Homepage from './Homepage/Homepage';
import Explore from './Explore/Explore';
import MealDetails from './MealDetails/MealDetails';
import RestaurantDetails from './RestaurantDetails/RestaurantDetails';
import AdminPage from '../AdminPage/AdminPage';
import { Notifications } from './Notifications';
import Favorites from './Favorites/Favorites';
import Checkout from './Checkout/Checkout';
import Profile from './Profile/Profile';

function MainApp(props) {

    const { url } = useRouteMatch();

    return (
        <>
        <Switch>
            <Route path={url} exact component={Homepage} />
            <Route path={`${url}/explore`} exact component={Explore} />
            <Route path={`${url}/notifications`} exact component={Notifications} />
            <Route path={`${url}/favorites`} exact component={Favorites} />
            <Route path={`${url}/checkout`} exact component={Checkout} />
            <Route path={`${url}/profile`} exact component={Profile} />
            <Route path={`${url}/meal/:mealId`} exact component={MealDetails} />
            <Route path={`${url}/restaurant/:restaurantId`} exact component={RestaurantDetails} />
            {
            props.type === 'RESTAURANT_ADMIN' ? 
                <Route path={`${url}/admin`} component={AdminPage} /> : 
                <Redirect to="/account/login" />
            }
        </Switch>
        </>
    )
}

const mapStateToProps = ({ user: { type } }) => ({ type });

export default connect(mapStateToProps, null)(MainApp);