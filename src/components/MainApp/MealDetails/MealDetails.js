import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { PrimaryButton } from '../../../Utilities/Buttons'
import styles from './MealDetails.module.css'

import { addMealToCart } from '../../../redux/dispatchers'

import mealImg from '../../../Utilities/MealCard/meal-image.png'
import Header from '../../../Utilities/Header/Header'
import Container from '../../../Utilities/Container'
import axios from 'axios'
// src\Utilities\MealCard\meal-image.png
function MealDetails(props) {
    const [meal, setMeal] =  useState([]);
    const [relatedMeals, setRelatedMeals] =  useState([]);

    const addOrder = () => {
        const { id, mealname, price, name, average_rating, rating_count } = meal;
        addMealToCart({ id, mealname, price, name, average_rating, rating_count }, props.dispatch)
    }
    const { mealId } = useParams();

    const fetchMeal = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/${mealId}`, { 
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            if (response.status === 200) {
                return setMeal(response.data.data);
            }
        } catch (error) {
            if (!error.response) {
                return console.log('No internet')
            }
            if(error.response.status === 404) {
                return console.log('Meal not found')
            }
            console.log(error.response)
        }
    }

    const fetchRelatedMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken },
                params: {
                    columnFilter: `category:${meal.category}`,
                    limit: "6"
                }
            });
            if (response.status === 200) {
                const relatedMeals = response.data.data;
                console.log(relatedMeals)
                setRelatedMeals(relatedMeals);
            }
        } catch (error) {
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchMeal()
        // Works
        // fetchRelatedMeals()
    }, [])

    return (
        <>
        <Header />
        <Container>
            <div className={'d-flex justify-between align-center ' + styles.mealDetailsContainer}>
                <div className={styles.imageContainer}>
                    <img src={meal.mealimage} alt="Meal Img" width="300px" height="300px" />
                </div>
                <div className={styles.mealDetails}>
                    <h5>{meal.mealname}</h5>
                    <span className="inline-link">*Restaurant Name*</span>
                    <p>{meal.description}</p>
                    <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                        <h5>{meal.price}</h5>
                        <select name='quantity'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <div className={styles.buttons}>
                            
                            <PrimaryButton onClick={addOrder}>Order</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.moreContent}>
                <div className={'d-flex justify-center align-center '+ styles.tabContainer}>
                    <span className={styles.tab}>
                        <h5>Ratings & Reviews</h5>
                        <span className={styles.active}></span>
                    </span>
                    <span className={styles.tab}>
                        <h5>Related meals</h5>
                    </span>
                </div>
                <div className={styles.content}>
                    Ratings & Reviews
                </div>
            </div>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken, cart: state.cart })

export default connect(mapStateToProps, null)(MealDetails)