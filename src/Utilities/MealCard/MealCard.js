import { PrimaryButton } from '../Buttons';
import mealImg from './meal-image.png';

import styles from './MealCard.module.css';

export function MealCard(props) {
    return (
        <div className={styles.mealContainer}>
            <div className={styles.mealImageContainer}>
                <img src={mealImg} alt="Meal img" />
            </div>
            <div className={'d-flex justify-between align-center ' + styles.name_rating}>
                <h6>{props.name}</h6>
                <h6>{props.averageRating}({props.ratingCount})</h6>
            </div>
            <p className="inline-link">{props.restaurantName}</p>
            <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                <h5>{props.price}</h5>
                <PrimaryButton>Add to cart</PrimaryButton>
            </div>
            <p className={styles.details}>{props.details}</p>
        </div>
    )
}