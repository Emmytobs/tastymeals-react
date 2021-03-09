import React from 'react'
import { PrimaryButton } from '../../../Utilities/Buttons'
import styles from './MealDetails.module.css'

import mealImg from '../../../Utilities/MealCard/meal-image.png'
// src\Utilities\MealCard\meal-image.png
export function MealDetails() {
    return (
        <>
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
                            <PrimaryButton>Add to cart</PrimaryButton>
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
        </>
    )
}
