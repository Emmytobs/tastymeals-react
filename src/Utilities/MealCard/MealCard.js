import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './MealCard.module.css';

function MealCard(props) {
    return (
        <div className={styles.mealContainer}>
            <Link to={`/app/meal/${props.mealid}`} className={styles.mealLink}>
                <div className={styles.mealImageContainer}>
                    <img src={props.image} alt="Meal img" />
                </div>
            </Link>
            <div className={'d-flex justify-between align-center ' + styles.name_rating}>
                <h6>{props.name}</h6>
                <h6>{props.averageRating}({props.ratingCount})</h6>
            </div>
            {props.restaurantName && 
            <Link to={`/app/restaurant/${props.restaurantId}`}>
                <p className={"inline-link "+ styles.restaurantName}>{props.restaurantName}</p>
            </Link>}
            <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                <h5>{props.price}</h5>
            </div>
            <p className={styles.details}>{props.details}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({ cart: state.cart })

export default connect(mapStateToProps, null)(MealCard);