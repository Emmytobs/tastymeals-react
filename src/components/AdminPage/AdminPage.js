import React, { useEffect, useState } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import { saveAdminRestaurantProfile } from '../../redux/dispatchers'

import Orders from './Orders/Orders'
import Meals from './Meals/Meals';
import CreateRestaurantProfile from './CreateRestaurantProfile/CreateRestaurantProfile';
import Overlay from '../../Utilities/Overlay';
import { PrimaryButton } from '../../Utilities';

function AdminPage(props) {
    const [showLoader, setShowLoader] = useState(true);
    const [hasRestaurantProfile, setHasRestaurantProfile] = useState(true);

    const fecthRestaurantProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurant/admin`, {
                headers: { 'Authorization': 'Bearer ' +  props.accessToken }
            });
            if (response.status === 204) {
                setShowLoader(false);
                setHasRestaurantProfile(false)
                return console.log('You have not created a restaurant profile')
            }
            const [restaurantProfile] = response.data.data;
            saveAdminRestaurantProfile(restaurantProfile, props.dispatch);
            setShowLoader(false)
        } catch (error) {
            if (!error.response) {
                return console.log('No internet');
            }
            console.log(error.response.message);
        }
    }

    useEffect(() => {
        fecthRestaurantProfile()
    }, [])

    const goToCreateProfilePage = () => {
        setHasRestaurantProfile(true);
        props.history.push('/app/admin/create-restaurant-profile')
    }

    if (showLoader) {
        return <p></p>
    }
    if (!hasRestaurantProfile) {
        return (
            <Overlay>
                <div className="container">
                    <h4 style={{ textAlign: 'center' }}>You have not created a restaurant profile yet.</h4>
                        <PrimaryButton style={{ margin: '0 auto', width: '120px' }} onClick={goToCreateProfilePage}>Create one</PrimaryButton>
                </div>
            </Overlay>
        )
    }

    return (
        <>
        <Switch>
            <Route path="/app/admin" exact>
                <Redirect to="/app/admin/meals" />
            </Route>
            <Route path="/app/admin/orders" exact component={Orders} />
            <Route path="/app/admin/meals" exact component={Meals} />
            <Route path="/app/admin/create-restaurant-profile" exact component={CreateRestaurantProfile} />
            {/* <Route to="/app/admin/my-restaurant" exact component={Orders} /> */}
        </Switch>
        {/* 
            Admins will have a sidebar that shows them orders, meals and their restaurant profile.

            The meals and orders will be in a tabular format
            
            Clicking on each meal/order will display another page showing more details about the meal/order. The admin can then perform administrative actions on them.

            On the meals page, the admin sees a 'Add Meal' button
        */}
        </>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken })

export default connect(mapStateToProps, null)(AdminPage)
