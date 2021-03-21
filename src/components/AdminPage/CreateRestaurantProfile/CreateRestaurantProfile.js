import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Formik } from 'formik'
import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'

import { saveAdminRestaurantProfile } from '../../../redux/dispatchers'

import styles from './CreateRestaurantProfile.module.css'

function CreateRestaurantProfile(props) {
    const [formData, setFormData] = useState(null);

    const createRestaurant = async (values) => {
        try {
            let imageUrlFromCloudinary = '';
            if (formData) {
                try {
                    const response = await axios.post(`https://api.cloudinary.com/v1_1/emmytobs/image/upload`, formData)
                    if (response.status === 200) {
                        const { secure_url } = response.data;
                        imageUrlFromCloudinary = secure_url;
                    }
                } catch (error) {
                    if (!error.response) {
                        return console.log('No internet')
                    }
                    console.log(error.response)
                }
            }
            
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/restaurant`,
                { image: imageUrlFromCloudinary && imageUrlFromCloudinary, ...values},
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

    const uploadImage = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'ml_default')
        setFormData(formData);
    }

    return (
        <div className={styles.componentContainer}>
            <h3 className={styles.pageTitle}>Create your restaurant profile</h3>
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
                            <p>
                                Choose an banner image to be displayed when customers view your restaurant profile:
                                <input type="file" placeholder="Upload an image" onChange={uploadImage} />
                            </p>
                            <PrimaryButton type="submit" style={{
                                display: 'block',
                                width: '50%',
                                margin: '0 auto'
                            }} >Create profile</PrimaryButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken })

export default connect(mapStateToProps, null)(CreateRestaurantProfile)
