import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';

import Orders from './Orders/Orders'
import Meals from './Meals/Meals';
import AddMeal from './AddMeal/AddMeal';

function AdminPage(props) {
    const [restaurantProfile, setRestaurantProfile] = useState(null);
    const [meals, setMeals] = useState([]);

    const fecthRestaurantProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurant/admin`, {
                headers: { 'Authorization': 'Bearer ' +  props.accessToken }
            });
            if (response.status !== 200) {
                const { message } = response.data;
                return console.log(message)
            }
            if (response.status === 204) {
                return console.log('You have not created a restaurant profile')
            }
            const restaurantProfile = response.data.data;
            setRestaurantProfile(restaurantProfile);
        } catch (error) {
            if (!error.response) {
                return console.log('No internet');
            }
            console.log(error.response.message);
        }
    }

    const fetchMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/admin`, {
                headers: { 'Authorization': 'Bearer ' + props.accessToken }
            })
            if (!response) {
                return console.log('No internet')
            }
            const meals = response.data.data;
            setMeals([ ...meals ]);
        } catch (error) {  
            if (!error.response) {
                return console.log('No internet');
            }
            console.log(error.response.message)
        }
    }

    useEffect(() => {
        fecthRestaurantProfile()
        fetchMeals()
    }, [])


    return (
        <>
        <Switch>
            <Route path="/app/admin/orders" exact component={Orders} />
            <Route to="/app/admin/meals" exact component={Meals} />
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
