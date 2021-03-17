import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import Header from '../../../Utilities/Header/Header'
import { Tab } from '../Homepage/Homepage'

import styles from './Explore.module.css'
import MealCard from '../../../Utilities/MealCard/MealCard'

function Explore(props) {
    const [meals, setMeals] = useState([])

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    // const searchQuery = useQuery().get('q')
    // const categorySearch = useQuery().get('columnFilter')
    const columnFilter = useQuery().get('columnFilter');
    const categoryName = useQuery().get('categoryName');
    const searchQuery = useQuery().get('q');
    // console.log(searchQuery)

    const fetchMeals = async () => {
        try {
            let response;
            if (categoryName) {
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/meal?columnFilter=${columnFilter}`,
                    { headers: { 'Authorization': 'Bearer '+ props.accessToken }}
                )
            } else if (searchQuery) {
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/meal?q=${searchQuery}`,
                    { headers: { 'Authorization': 'Bearer '+ props.accessToken }}
                )
            }
            if (response.status === 200) {
                return setMeals(response.data.data);
            }
        } catch (error) {
            if (!error.response) {
                return console.log('No internet')
            }
            if (error.response.status === 404) {
                return setMeals(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        fetchMeals()
    }, [columnFilter, searchQuery])

    return (
        <>
        <Header {...props} />
        <div className={styles.exploreContainer}>
            <h2 className={styles.pageTitle}>{categoryName}</h2>
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
            
            {
                !Array.isArray(meals) ?
                <div>
                    <h4 className={styles.errorMessage}>{meals}</h4>
                </div> :
                <div className={styles.mealWrapper}>
                    {
                    meals.map((meal, index) => (
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
            }


            <ExploreNav />
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    foodCategories: state.foodCategories,
    accessToken: state.accessToken
})

export default connect(mapStateToProps, null)(Explore)

function ExploreNav() {
    return (
        <div className={styles.exploreNav}>
            <div>
                <div>
                    <input id="popular" name="filter" type="radio"/>
                    <label htmlFor="popular">Popular</label>
                </div>
                <div>
                    <input id="top-rated" name="filter" type="radio"/>
                    <label htmlFor="top-rated">Top rated</label>
                </div>
                <div>
                    <input id="least-expensive" name="filter" type="radio"/>
                    <label htmlFor="least-expensive">Least expensive</label>
                </div>
            </div>
        </div>
    )
}