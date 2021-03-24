import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';

import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'

import { saveTokens } from '../../../redux/dispatchers'

import styles from './Register.module.css'
import { Link } from 'react-router-dom';

function Register(props) {
    const [userType, setUserType] = useState('CUSTOMER');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                setIsSubmitting(false)
                saveTokens([ accessToken, refreshToken ], props.dispatch)
                props.history.push('/app')
            }
        } catch (error) {
            setIsSubmitting(false)
            console.log(error)
        }
    }

    const registerUser = async (formData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formData);
            if (response.status === 201) {
                loginNewUser({ email: formData.email, password: formData.password })
            }
        } catch (error) {
            setIsSubmitting(false)
            console.log(error.response);
        }
    }

    return (
        <div className={styles.registerContainer}>
            <h2>Tasty <span className="text-highlight">Meals</span></h2>
            <div style={{ opacity: isSubmitting ? 0.7 : 1 }} className={'container '+ styles.formContainer}>
                <h3>Register Account</h3>
                <p>What do you want to do?</p>
                <Formik
                    initialValues={initialValues}
                    validate={() => {}}
                    onSubmit={(values) => {
                        registerUser(values)
                    }}
                >
                    {({ errors, touched, values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={styles.selectUserType} onChange={onChangeUserType}>
                                <label for="buy">
                                    I want to buy 
                                    <input type="radio" name="type" id="buy" onChange={handleChange} value="CUSTOMER" checked={userType === 'CUSTOMER'} />
                                </label>
                                <label for="sell">
                                    I want to sell
                                    <input type="radio" name="type" id="sell" onChange={handleChange} value="RESTAURANT_ADMIN" checked={userType === 'RESTAURANT_ADMIN'} />
                                </label>
                            </div>
                            <div className={styles.inputs}>
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

                                <PrimaryButton style={{ width: '100%' }} type="submit">Create Account</PrimaryButton>
                            </div>
                        </form>
                    )}
                </Formik>
                <p className={styles.login}>Already have an account? <Link to="/account/login" className="inline-link">Login</Link></p>
            </div>
        </div>
    )
}

export default connect(null, null)(Register);