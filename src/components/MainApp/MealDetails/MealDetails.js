import React from 'react'
import { connect } from 'react-redux'
import { PrimaryButton } from '../../../Utilities/Buttons'
import styles from './MealDetails.module.css'

import { addMealToCart } from '../../../redux/dispatchers'

import mealImg from '../../../Utilities/MealCard/meal-image.png'
import Header from '../../../Utilities/Header/Header'
import Container from '../../../Utilities/Container'
// src\Utilities\MealCard\meal-image.png
function MealDetails(props) {
    const addToCart = () => {
        // First, make sure the meal is coming from the db
        // addMealToCart()
    }

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
                        <div className={styles.buttons}>

                            <PrimaryButton onClick={addToCart} >Add to cart</PrimaryButton>
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

const mapStateToProps = (state) => ({ cart: state.cart })

export default connect(mapStateToProps, null)(MealDetails)