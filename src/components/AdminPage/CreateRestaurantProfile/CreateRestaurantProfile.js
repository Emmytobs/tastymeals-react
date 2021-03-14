import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Formik } from 'formik'
import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'

import { saveAdminRestaurantProfile } from '../../../redux/dispatchers'

import styles from './CreateRestaurantProfile.module.css'

function CreateRestaurantProfile(props) {

    const createRestaurant = async (values) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/restaurant`,
                values,
                { headers: { 'Authorization': 'Bearer ' + props.accessToken } })
            if (response.status === 201) {
                const newRestaurant = response.data.data;
                saveAdminRestaurantProfile(newRestaurant, props.dispatch)
                props.history.push('/app/admin')
            }
        } catch (error) {
            if (!error.response) {
                return console.log('No internet')
            }
            console.log(error.response)
        }
    }

    return (
        <div className={styles.componentContainer}>
            <div className={styles.pageTitle}>
                <h2>Create your restaurant profile</h2>
            </div>
            <div>
                <Formik
                    initialValues={{ name:'', address:'', city:'', country:'' }}
                    onSubmit={(values) => {
                        createRestaurant(values)
                    }}
                >
                    {({ errors, values, touched, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                            <Input 
                                type="text"
                                name="name"
                                placeholder="Enter your restaurant name"
                                onChange={handleChange}
                                value={values.name}
                            />
                            <Input 
                                type="text"
                                name="address"
                                placeholder="Enter your restaurant address"
                                onChange={handleChange}
                                value={values.address}
                            />
                            <Input 
                                type="text"
                                name="city"
                                placeholder="City"
                                onChange={handleChange}
                                value={values.city}
                            />
                            <Input 
                                type="text"
                                name="country"
                                placeholder="Country"
                                onChange={handleChange}
                                value={values.country}
                            />
                            <input type="file" placeholder="Upload an image" />
                            <PrimaryButton type="submit">Create profile</PrimaryButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken })

export default connect(mapStateToProps, null)(CreateRestaurantProfile)
