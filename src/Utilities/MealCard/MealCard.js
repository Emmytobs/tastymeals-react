import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import favorited from './favorited.png'
import unfavorited from './unfavorited.png'

import styles from './MealCard.module.css';

function MealCard(props) {
    const [favorite, setFavorite] = useState(false);
    const toggleFavoriteMeal = (e) => {
        setFavorite(!favorite)
    }
    return (
        <div className={styles.mealContainer}>
                <div className={styles.mealImageContainer}>
                    <Link to={`/app/meal/${props.mealid}`} className={styles.mealLink}> 
                        <img src={props.image} alt="Meal img" className={styles.mealImage} />
                    </Link>
                    <div className={styles.favoriteContainer} name="favorite" onClick={toggleFavoriteMeal} title="Add to favorites">
                        {
                            favorite ?
                            <img src={favorited} alt="Favorite icon" className={styles.favoriteIcon} /> :
                            <img src={unfavorited}  alt="Unfavorite icon"  className={styles.favoriteIcon} />
                        }
                    </div>
                </div>
                <div className={styles.mealDetails}>
                    <div className={styles.name_rating}>
                        <h6 className={styles.mealName}>{props.name}</h6>
                        <span>{props.averageRating}</span>
                    </div>
                    <div className={styles.restaurantName_price}>
                        <Link to={`/app/restaurant/${props.restaurantId}`} className="inline-link">{props.restaurantName}</Link>
                        <span>{props.price}</span>
                    </div>
                    <p className={styles.details}>{props.details}</p>
                </div>
            {/* <Link to={`/app/meal/${props.mealid}`} className={styles.mealLink}>
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
            <p className={styles.details}>{props.details}</p> */}
        </div>
    )
}

const mapStateToProps = (state) => ({ cart: state.cart })

export default connect(mapStateToProps, null)(MealCard);