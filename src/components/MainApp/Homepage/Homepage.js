import React from 'react'
import Container from '../../../Utilities/Container';
import Header from '../../../Utilities/Header/Header';
// import axios from 'axios';

import MealCard from '../../../Utilities/MealCard';

import styles from './Homepage.module.css';

export function Homepage(props) {

    return (
        <>
        <Header />
        <Container {...props}>
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h4>Categories</h4> <span>|</span> <span className='inline-link'>View all</span>
                </div>
                <div className={styles.tabs}>
                    <Tab active>Drinks</Tab>
                    <Tab>Protein</Tab>
                    <Tab>Africana</Tab>
                    <Tab>Veggies</Tab>
                </div>
            </section>
            
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h4>Special Offers</h4> <span>|</span> <span className='inline-link'>View all</span>
                </div>
                
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

                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h4>Most popular</h4> <span>|</span> <span className='inline-link'>View all</span>
                </div>

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
            </section> 
        </Container>
        </>
    )
}

function Tab (props) {
    return ( 
        <span
            style={{ color: props.active && '#fff', backgroundColor: props.active && '#FD8867' }} 
            className={styles.tab}>
            {props.children}
        </span>
    )
}