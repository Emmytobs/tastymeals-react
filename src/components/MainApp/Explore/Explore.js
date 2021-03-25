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
    const orderBy = useQuery().get('order_by');

    const fetchMeals = async () => {
        try {
            let response;
            if (columnFilter) {
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/meal?columnFilter=${columnFilter}`,
                    { headers: { 'Authorization': 'Bearer '+ props.accessToken }}
                )
            } else if (searchQuery) {
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/meal?q=${searchQuery}`,
                    { headers: { 'Authorization': 'Bearer '+ props.accessToken }}
                )
            } else if (orderBy) {
                response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/meal?order_by=${orderBy}`,
                    { headers: { 'Authorization': 'Bearer '+ props.accessToken }}
                )
            }
            if(!response) {
                setMeals('Start by searching for a meal, or click on the categories above')
            }
            if (response && response.status === 200) {
                return setMeals(response.data.data);
            }
        } catch (error) {
            if (!error.response) {
                setMeals('Couldn\'t fetch meals. Check your connection')
                return console.log('No internet')
            }
            if (error.response.status === 404) {
                return setMeals(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        // Everytime the query params change, fetch meals and filter by the updated query params
        fetchMeals()
    }, [useLocation().search])

    return (
        <>
        <Header {...props} />
        <div className={styles.exploreContainer}>
            <h2 className={styles.pageTitle}>{searchQuery && `'${searchQuery}'`}</h2>
            <div className={styles.tabs}>
                { props.foodCategories.map((category, index) => 
                    <Tab 
                        key={index} 
                        id={category.categoryid} 
                        name={category.categoryname}
                        history={props.history}
                        active={categoryName === category.categoryname}
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
                            restaurantId={meal.restaurantid}
                            price={meal.price}
                            details={meal.description}
                        />
                    ))
                    }
                </div>
            }


            <ExploreNav history={props.history} />
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    foodCategories: state.foodCategories,
    accessToken: state.accessToken
})

export default connect(mapStateToProps, null)(Explore)

function ExploreNav(props) {
    const [radioValue, setRadioValue] = useState('')
    const handleFilterChange = (e) => {
        const categoryName = e.target.getAttribute('data-filter-name')
        setRadioValue(e.target.value)
    }
    useEffect(() => {
        if (radioValue) {
            props.history.push(`/app/explore${radioValue}`)
        }
    }, [radioValue])
    return (
        <div className={styles.exploreNav}>
            <div>
                <div>
                    <input 
                        id="popular" 
                        name="filter" 
                        type="radio"
                        value='?order_by=order_count:desc'
                        data-filter-name="Most Popular"
                        checked={radioValue === '?order_by=order_count:desc'}
                        onChange={handleFilterChange}/>
                    <label htmlFor="popular">Popular</label>
                </div>
                <div>
                    <input 
                        id="top-rated" 
                        name="filter" 
                        type="radio"
                        value="?order_by=rating_count:desc"
                        data-filter-name="Top rated"
                        checked={radioValue === '?order_by=rating_count:desc'}
                        onChange={handleFilterChange}/>
                    <label htmlFor="top-rated">Top rated</label>
                </div>
                <div>
                    <input 
                        id="least-expensive" 
                        name="filter" 
                        type="radio"
                        value='?order_by=price:asc'
                        data-filter-name="Lowest Price"
                        checked={radioValue === '?order_by=price:asc'}
                        onChange={handleFilterChange}/>
                    <label htmlFor="least-expensive">By Lowest Price</label>
                </div>
            </div>
        </div>
    )
}