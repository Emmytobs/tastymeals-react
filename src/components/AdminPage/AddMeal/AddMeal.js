import React from 'react'
import { connect } from 'react-redux'
import { saveMealByAdmin } from '../../../redux/dispatchers'

import axios from 'axios'
import { Formik } from 'formik';

import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'

import styles from './AddMeal.module.css';

function AddMeal(props) {
    const [formData, setFormData] = React.useState(null);
    const initialValues = {
        name: '',
        description: '',
        price: '',
        category: ''
    }
    // const validationSchema = null;
    const submitForm = async (values) => {
        try {
            // const response = await axios.post(`${process.env.REACT_APP_CLOUDINARY_API_URL}`, formData)
            // console.log(process.env.REACT_APP_CLOUDINARY_API_URL)
            let imageUrlFromCloudinary = '';
            if (formData) {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/emmytobs/image/upload`, formData)
                if (response.status === 200) {
                    const { secure_url } = response.data;
                    imageUrlFromCloudinary = secure_url;
                }
            }
            
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/meal`, 
                    { image: imageUrlFromCloudinary ? imageUrlFromCloudinary : 'image-placeholder', ...values },
                    { headers: { 'Authorization': 'Bearer ' + props.accessToken } }
                );
                if(response.status === 201) {
                    const newMeal = response.data.data;
                    saveMealByAdmin(newMeal, props.dispatch)
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error)
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
        <div className={styles.addMealContainer}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    // console.log(values)
                    submitForm(values)
                }}
            >
                {({ errors, values, touched, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} noValidate>
                        {/* <img src={} /> */}
                        <input type="file" name="image" onChange={uploadImage} />
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Meal Name"
                            value={values.name} 
                            onChange={handleChange} />
                        <Input 
                            type="text" 
                            name="description" 
                            placeholder="Add a meal description..."
                            value={values.description} 
                            onChange={handleChange} />
                        <Input 
                            type="number" 
                            name="price" 
                            placeholder="Set the price"
                            value={values.price} 
                            onChange={handleChange} />
                        <select name="category" value={values.category} onChange={handleChange}>
                            <option value="category 1">category 1</option>
                            <option value="category 2">category 2</option>
                        </select>

                        <PrimaryButton type="submit">Add meal</PrimaryButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken })

export default connect(mapStateToProps, null)(AddMeal)