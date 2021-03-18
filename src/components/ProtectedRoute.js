import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveTokens, saveUserData } from '../redux/dispatchers'

import axios from 'axios';

function ProtectedRoute(props) {
    const tokenStatuses = ['VERIFYING', 'VALID', 'INVALID / NO TOKEN'];
    const [tokenStatus, setTokenStatus] = useState(tokenStatuses[0]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {
                headers: { 'Authorization': props.accessToken }
            });
            if (!response) {
                return setTokenStatus(tokenStatus[2]);
            }
            // If response is not 200, access token is not valid
            if (response.status !== 200) {
                // if refreshToken is not in redux store, set token as invalid
                // if (!props.refreshToken) {
                //     return setTokenStatus(tokenStatuses[2]);
                // }
                // If refreshToken is in redux store, use it to get another accessToken
                // try {
                //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/token`, {
                //         headers: { 'Authorization': props.refreshToken }
                //     })
                //     // If the response is not 201, the refresh token has expired
                //     if (response.status !== 201) {
                //         return setTokenStatus(tokenStatuses[2]);   
                //     }
                //     // if it is 201, save access token to store
                //     const { accessToken } = response.data.data;
                //     saveTokens([ accessToken, props.refreshToken ], props.dispatch);
                //     setTokenStatus(tokenStatuses[1]);
                // } catch (error) {
                //     console.log(error)
                // }
            }
            // If response is 200, token is valid, 
            // save user data
            const user = response.data.data;
            saveUserData(user, props.dispatch);
            return setTokenStatus(tokenStatuses[1])

        } catch (error) {
            // console.log(error.response)
            return setTokenStatus(tokenStatuses[2])
        }
    }

    useEffect(() => {
        // Check if redux store has access token
        if (!props.accessToken) {
            return setTokenStatus(tokenStatuses[2]);
        }
        // If is has, try to fetch the user's data
        fetchUserData()
    }, []);

    if (tokenStatus === tokenStatuses[0]) {
        return <p>Loading...</p>
    } else if (tokenStatus === tokenStatuses[1]) {
        return (
            <Route 
                path={props.path}
                exact={props.exact}
                component={props.component}
            />
        )
    } else {
        return (
            <Redirect to="/account/login" />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken
    }
}

export default connect(mapStateToProps, null)(ProtectedRoute)
