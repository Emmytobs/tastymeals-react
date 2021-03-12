import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';

import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'

import { saveTokens } from '../../../redux/dispatchers'

function Register(props) {
    const [userType, setUserType] = useState('CUSTOMER');

    const initialValues = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: ''
    }

    const onChangeUserType = (e) => {
        setUserType(e.target.value);
    }

    const loginNewUser = async (loginCredentials) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, loginCredentials);
            if (response.status === 200) {
                // Set access and refresh token
                const { accessToken, refreshToken } = response.data.data;
                saveTokens([ accessToken, refreshToken ], props.dispatch)
                props.history.push('/app')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const registerUser = async (formData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formData);
            if (response.status === 201) {
                loginNewUser({ email: formData.email, password: formData.password })
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div>
            <h3>Register Account</h3>
            <h5>What do you want to do?</h5>
            <Formik
                initialValues={initialValues}
                validate={() => {}}
                onSubmit={(values) => {
                    registerUser(values)
                }}
            >
                {({ errors, touched, values, handleChange, handleSubmit }) => (
                    <Form width="300px" onSubmit={handleSubmit} noValidate>
                        <div onChange={onChangeUserType}>
                            <label for="buy">I want to buy <input type="radio" name="type" id="buy" onChange={handleChange} value="CUSTOMER" /></label>
                            <label for="sell">I want to sell <input type="radio" name="type" id="sell" onChange={handleChange} value="RESTAURANT_ADMIN" /></label>
                        </div>
                        {
                            userType === 'RESTAURANT_ADMIN' &&
                            (
                                <>
                                <Input 
                                    type="text" 
                                    placeholder="First Name"
                                    name="firstname" 
                                    onChange={handleChange}
                                    value={values.firstname} />
                                <Input 
                                    type="text" 
                                    placeholder="Last Name"
                                    name="lastname" 
                                    onChange={handleChange}
                                    value={values.lastname} />
                                <Input 
                                    type="number" 
                                    placeholder="Phone Number"
                                    name="phone" 
                                    onChange={handleChange}
                                    value={values.phone} />
                                </>
                            )
                        }
                        <Input 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            onChange={handleChange}
                            value={values.email} />
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            onChange={handleChange}
                            value={values.password} />

                        <PrimaryButton type="submit">Create Account</PrimaryButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default connect(null, null)(Register);