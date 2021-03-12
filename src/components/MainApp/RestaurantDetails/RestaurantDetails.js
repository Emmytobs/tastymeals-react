import React from 'react'
import styles from './RestaurantDetails.module.css';
import MealCard from '../../../Utilities/MealCard';

import restaurantImg from './restaurantImg.png'
import Header from '../../../Utilities/Header/Header';
import Container from '../../../Utilities/Container';

export function RestaurantDetails() {
    return (
        <>
        <Header />
        <Container>
            <div className={'container d-flex justify-around align-start ' + styles.restaurantDetailsContainer}>
                <div>
                    <h3>Kobis Foods</h3>
                    <div style={{ width: '400px', height: '400px', backgroundColor: "#444" }}>
                        <img src={restaurantImg} className={styles.restaurantImg} alt="Restaurant Img" width="100%" height="100%" />
                    </div>
                    <div className={styles.adminData}>
                        <img src="*dp*" alt="Restaurant admin's display pic" className="dp-size" />
                        <h5>Jumai Alabi</h5>
                        <span>call</span>
                        <span>email</span>
                    </div>
                </div>
                <div className={`container ${styles.restaurantStats}`}>
                    <h3>Restaurant Stats</h3>
                    <h5>Average Rating: <span className={"text-highlight "+ styles.rating}> <h2 className="text-highlight">4</h2> /5</span> </h5>
                    <h5>*star*</h5>

                    <h5>Total meal offerings: 5</h5>
                </div>
            </div>

            <div className={'container ' + styles.meals}>
                <h5>Meals by Kobis Foods</h5>
                <div className={styles.mealWrapper}>
                    <MealCard 
                        name="Chicken Paella Rice"
                        averageRating={4.5}
                        ratingCount={21}
                        restaurantName="Kobis Foods"
                        price={2500}
                        details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                   />
                    <MealCard 
                        name="Chicken Paella Rice"
                        averageRating={4.5}
                        ratingCount={21}
                        restaurantName="Kobis Foods"
                        price={2500}
                        details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                   />
                    <MealCard 
                        name="Chicken Paella Rice"
                        averageRating={4.5}
                        ratingCount={21}
                        restaurantName="Kobis Foods"
                        price={2500}
                        details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                   />
                    <MealCard 
                        name="Chicken Paella Rice"
                        averageRating={4.5}
                        ratingCount={21}
                        restaurantName="Kobis Foods"
                        price={2500}
                        details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                   />
                    <MealCard 
                        name="Chicken Paella Rice"
                        averageRating={4.5}
                        ratingCount={21}
                        restaurantName="Kobis Foods"
                        price={2500}
                        details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                   />
                </div>
            </div>
        </Container>
        </>
    )
}
