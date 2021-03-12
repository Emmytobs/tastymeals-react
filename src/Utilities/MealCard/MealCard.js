import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../Buttons';
// import mealImg from './meal-image.png';

import styles from './MealCard.module.css';

export function MealCard(props) {
    const [mealCount, setMealCount] = useState(0);

    const incrementMealCount = () => setMealCount(mealCount + 1)
    const decrementMealCount = () => setMealCount(mealCount - 1)
    return (
        <div className={styles.mealContainer}>
                <Link to="/app/meal/1" className={styles.mealLink}>
                    <div className={styles.mealImageContainer}>
                        <img src="https://res.cloudinary.com/emmytobs/image/upload/v1615458822/meal-image_jbajj2.png" alt="Meal img" />
                    </div>
                </Link>
                <div className={'d-flex justify-between align-center ' + styles.name_rating}>
                    <h6>{props.name}</h6>
                    <h6>{props.averageRating}({props.ratingCount})</h6>
                </div>
                <Link to="/app/restaurant/1"><p className="inline-link">{props.restaurantName}</p></Link>
                <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                    <h5>{props.price}</h5>
                    {
                    mealCount === 0 ? 
                    <PrimaryButton onClick={incrementMealCount}>Add to cart</PrimaryButton> :
                    <div className={styles.mealCountContainer}>
                        <button onClick={decrementMealCount} className={styles.incrementBtn}>-</button>
                        <span>{mealCount}</span>
                        <button onClick={incrementMealCount} className={styles.decrementBtn}>+</button>
                    </div>
                    }
                </div>
                <p className={styles.details}>{props.details}</p>
            </div>
    )
}