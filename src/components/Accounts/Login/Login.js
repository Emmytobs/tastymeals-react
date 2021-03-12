import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import axios from 'axios'
// import * as Yup from 'yup';

import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'
import { saveTokens } from '../../../redux/dispatchers'

function Login(props) {
    const initialValues = {
        email: '',
        password: ''
    }

    const loginUser = async (formData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, formData);
            if (response.status === 200) {
                // Set access and refresh token
                const { accessToken, refreshToken } = response.data.data;
                saveTokens([ accessToken, refreshToken ], props.dispatch)
                props.history.push('/app');
            }
        } catch (error) {
            if (!error.response) {
                return console.log('No internet')
            }
            console.log(error.response);
        }
    }

    return (
        <div>
            <h3>Welcome Back</h3>
            <h5>Lorem ipsum dolor sit amet.</h5>
            <Formik
                initialValues={initialValues}
                validate={() => {}}
                onSubmit={(values) => {
                    loginUser(values)
                    // console.log(values)
                }}
            >
                {({ errors, touched, values, handleChange, handleSubmit }) => (
                    <Form style={{ width: "300px" }} onSubmit={handleSubmit} noValidate>
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

                        <PrimaryButton type="submit">Login</PrimaryButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default connect(null, null)(Login);