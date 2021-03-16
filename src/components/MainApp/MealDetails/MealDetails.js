import React, { useEffect } from 'react'
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
    const addOrder = () => {
        const { id, name, price, restaurantName, averageRating, ratingCount } = props;
        addMealToCart({ id, name, price, restaurantName, averageRating, ratingCount }, props.dispatch)
    }
    const { mealId } = useParams();
    const fetchMeal = async (meaId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/${mealId}`, { 
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            console.log(response);
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
    useEffect(() => {
        fetchMeal(mealId)
    }, [])

    return (
        <>
        <Header />
        <Container>
            <div className={'d-flex justify-between align-center ' + styles.mealDetailsContainer}>
                <div className={styles.imageContainer}>
                    <img src={mealImg} alt="Meal Img" width="300px" height="300px" />
                </div>
                <div className={styles.mealDetails}>
                    <h5>Chicken Paella Rice</h5>
                    <span className="inline-link">Kobis Foods</span>
                    <p>Fresh okro, fish and other seafoods, spices, special Kobis ingredients.</p>
                    <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                        <h5>2,500</h5>
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
                        <h5>More from Kobis Foods</h5>
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