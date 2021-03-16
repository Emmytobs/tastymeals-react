import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import Container from '../../../Utilities/Container';
import Header from '../../../Utilities/Header/Header';
// import axios from 'axios';

import MealCard from '../../../Utilities/MealCard/MealCard';

import styles from './Homepage.module.css';

function Homepage(props) {

    const fetchFoodCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`, { headers: 'Bearer '+ props.accessToken });
        } catch (error) {
            
        }
    }

    useEffect(() => {
        // Fetch food categories
        fetchFoodCategories()
        // Fetch most popular meals
        // Fetch most popular restaurants
    }, []);

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
                    <h2>Most popular</h2> <span>|</span> <span className='inline-link'>View all</span>
                </div>

                <div className={styles.mealWrapper}>
                    {
                        [1,2,3].map((item, index) => (
                            <MealCard
                                key={index}
                                id={index}
                                name="Chicken Paella Rice"
                                averageRating={4.5}
                                ratingCount={21}
                                restaurantName="Kobis Foods"
                                price={2500}
                                details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                            />
                        ))
                    }
                </div>
            </section>
                

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h2>To Rated</h2> <span>|</span> <span className='inline-link'>View all</span>
                </div>
                
                <div className={styles.mealWrapper}>
                {
                    [1,2,3].map((item, index) => (
                        <MealCard
                            key={index}
                            id={index}
                            name="Chicken Paella Rice"
                            averageRating={4.5}
                            ratingCount={21}
                            restaurantName="Kobis Foods"
                            price={2500}
                            details="Fresh okro, fish and other seafoods, spices, special Kobis ingredients."
                        />
                    ))
                }

                </div>
            </section>
        </Container>
        </>
    )
}

const mapStateToProps = (state) => (
    {
        accessToken: state.accessToken
    }
)

export default connect(mapStateToProps, null)(Homepage)

function Tab (props) {
    return ( 
        <span
            style={{ color: props.active && '#fff', backgroundColor: props.active && '#FD8867' }} 
            className={styles.tab}>
            {props.children}
        </span>
    )
}