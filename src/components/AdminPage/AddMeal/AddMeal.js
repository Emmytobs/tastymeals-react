import React from 'react'
import { connect } from 'react-redux'
import { saveMeals } from '../../../redux/dispatchers'

import axios from 'axios'
import { Formik } from 'formik';

import { Form, Input } from '../../../Utilities/Form'
import { PrimaryButton } from '../../../Utilities/Buttons'

import styles from './AddMeal.module.css';
import { Option, Select } from '../../../Utilities/Form/Form';

function AddMeal(props) {
    const [formData, setFormData] = React.useState(null);
 
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
                    saveMeals(newMeal, 'ADMIN', props.dispatch)
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error.response)
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
                initialValues={{  name: '', description: '', price: '', category: '' }}
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
                        <Select 
                            name="category" 
                            value={values.category} 
                            onChange={handleChange}
                            style={{ width: '100%' }}>
                            <Option>Choose Category</Option>
                            {props.foodCategories.map((category, index) => (
                                <Option key={index} value={category.categoryid}>{category.categoryname}</Option>
                            ))}
                        </Select>

                        <PrimaryButton type="submit">Add meal</PrimaryButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken, foodCategories: state.foodCategories })

export default connect(mapStateToProps, null)(AddMeal)