import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import axios from 'axios'
// import * as Yup from 'yup';

import { Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'
import { saveTokens } from '../../../redux/dispatchers'

import styles from './Login.module.css'
import { Link } from 'react-router-dom';

function Login(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        email: '',
        password: ''
    }

    const loginUser = async (formData) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, formData);
            if (response.status === 200) {
                // Set access and refresh token
                const { accessToken, refreshToken } = response.data.data;
                saveTokens([ accessToken, refreshToken ], props.dispatch)
                setIsSubmitting(false);
                props.history.push('/app');
            }
        } catch (error) {
            setIsSubmitting(false)
            if (!error.response) {
                return console.log('No internet')
            }
            console.log(error.response);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <h2>Tasty <span className="text-highlight">Meals</span></h2>
            <div style={{ opacity: isSubmitting ? 0.7 : 1 }} className={'container ' + styles.formContainer}>
                <h3>Welcome Back</h3>
                <p>Please provide your registered email and password</p>
                <Formik
                    initialValues={initialValues}
                    validate={() => {}}
                    onSubmit={(values) => {
                        loginUser(values)
                        // console.log(values)
                    }}
                >
                    {({ errors, touched, values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} noValidate>
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
                        </form>
                    )}
                </Formik>
                <p className={styles.createAccount}>Don't have an account? <Link to="/account/register" className="inline-link">Create one</Link></p>
            </div>
        </div>
    )
}

export default connect(null, null)(Login);