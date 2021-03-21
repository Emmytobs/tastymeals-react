import React, { useEffect, useState } from 'react'
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
                        <span className={styles.averageRating}>{props.averageRating}</span>
                    </div>
                    <div className={styles.restaurantName_price}>
                        <Link to={`/app/restaurant/${props.restaurantId}`} className="inline-link">{props.restaurantName}</Link>
                        <span>{props.price}</span>
                    </div>
                    <p className={styles.details}>{props.details}</p>
                </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ cart: state.cart, favorites: state.meals['FAVORITES'] })

export default connect(mapStateToProps, null)(MealCard);