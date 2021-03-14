import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { OutlineButton, PrimaryButton } from '../Buttons';
import { addMealToCart, removeMealFromCart } from '../../redux/dispatchers';

import styles from './MealCard.module.css';

function MealCard(props) {
    const [mealInCart, setMealInCart] = useState(false);

    const addToCart = () => {
        const { id, name, price, restaurantName, averageRating, ratingCount } = props;
        addMealToCart({ id, name, price, restaurantName, averageRating, ratingCount }, props.dispatch)
        setMealInCart(true)
    }
    const removeFromCart = () => {
        removeMealFromCart(props.id, props.dispatch)
        setMealInCart(false)
    }

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
            <Link to="/app/restaurant/1"><p className={"inline-link "+ styles.restaurantName}>{props.restaurantName}</p></Link>
            <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                <h5>{props.price}</h5>
                {
                props.cart.find(item => item.id === props.id) ? 
                (
                <div>
                    <OutlineButton>Added</OutlineButton>
                    <button onClick={removeFromCart}>delete</button>
                </div>
                ) :
                <PrimaryButton onClick={addToCart}>Add to cart</PrimaryButton>
                }
            </div>
            <p className={styles.details}>{props.details}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({ cart: state.cart })

export default connect(mapStateToProps, null)(MealCard);