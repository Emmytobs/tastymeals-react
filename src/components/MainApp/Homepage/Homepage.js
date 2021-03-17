import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import Container from '../../../Utilities/Container';
import Header from '../../../Utilities/Header/Header';
import { saveFoodCategories, saveMeals } from '../../../redux/dispatchers'

import MealCard from '../../../Utilities/MealCard/MealCard';

import styles from './Homepage.module.css';

function Homepage(props) {
    const fetchFoodCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`, { 
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            saveFoodCategories(response.data.data, props.dispatch);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPopularMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal?limit=10&offset=0&order_by=order_count:desc`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            const popularMeals = response.data.data;
            saveMeals(popularMeals, 'POPULAR', props.dispatch)
        } catch (error) {
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error.response)
        }
    }

    const fetchTopRatedMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal?limit=10&offset=0&order_by=average_rating:desc`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            const topRatedMeals = response.data.data;
            saveMeals(topRatedMeals, 'TOP RATED', props.dispatch)
        } catch (error) {
            if(!error.response) {
                console.log('No internet')
            }
            console.log(error.response)
        }
    }

    useEffect(() => {
        // Fetch food categories
        fetchFoodCategories()
        // Fetch most popular meals
        fetchPopularMeals()
        // Fetch most popular restaurants
        fetchTopRatedMeals()
    }, []);

    return (
        <>
        <Header {...props} />
        <div className={styles.homepageContainer}>
            <section className={styles.section}>
                <div className={styles.tabs}>
                    { props.foodCategories.map((category, index) => 
                        <Tab 
                            key={index} 
                            id={category.categoryid} 
                            name={category.categoryname}
                            history={props.history}
                        >
                            {category.categoryname}
                        </Tab>)
                    }
                </div>
            </section>


            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h2>Most popular</h2> <span>|</span> <span className='inline-link'>View all</span>
                </div>

                <div className={styles.mealWrapper}>
                    {
                        props.meals['POPULAR'].map((meal, index) => (
                            <MealCard
                                key={index}
                                id={index}
                                mealid={meal.mealid}
                                image={meal.mealimage}
                                name={meal.mealname}
                                averageRating={meal.average_rating}
                                ratingCount={meal.rating_count}
                                restaurantName={meal.name}
                                restaurantId={meal.restaurantid}
                                price={meal.price}
                                details={meal.description}
                            />
                        ))
                    }
                </div>
            </section>
                

            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h2>Top Rated</h2> <span>|</span> <span className='inline-link'>View all</span>
                </div>
                
                <div className={styles.mealWrapper}>
                    {
                        props.meals['TOP RATED'].map((meal, index) => (
                            <MealCard
                                key={index}
                                mealid={meal.mealid}
                                image={meal.mealimage}
                                name={meal.mealname}
                                averageRating={meal.average_rating}
                                ratingCount={meal.rating_count}
                                restaurantName={meal.name}
                                price={meal.price}
                                details={meal.description}
                            />
                        ))
                    }
                </div>
            </section>
        </div>  
        </>
    )
}

const mapStateToProps = (state) => (
    {
        accessToken: state.accessToken,
        foodCategories: state.foodCategories,
        meals: state.meals
    }
)

export default connect(mapStateToProps, null)(Homepage)

export function Tab (props) {
    const goToExplore = (category) => {
        props.history.push(`/app/explore?columnFilter=category:${props.id}&categoryName=${props.name}`)
    }

    return ( 
        <span
            onClick={() => goToExplore(props.children)}
            style={{ color: props.active && '#fff', backgroundColor: props.active && '#FD8867' }} 
            className={styles.tab}>
            {props.children}
        </span>
    )
}