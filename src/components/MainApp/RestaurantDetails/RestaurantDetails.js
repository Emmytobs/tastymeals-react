import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import styles from './RestaurantDetails.module.css';
import MealCard from '../../../Utilities/MealCard/MealCard';

import restaurantImg from './restaurantImg.png'
import Header from '../../../Utilities/Header/Header';
import Container from '../../../Utilities/Container';
import axios from 'axios';

function RestaurantDetails(props) {
    const { restaurantId } = useParams();
    const [restaurantData, setRestaurantData] = useState({});
    const [relatedMeals, setRelatedMeals] = useState([]);

    const fetchRestaurantData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurant/${restaurantId}`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            })
            if (response.status === 200) {
                console.log(response)
                setRestaurantData(response.data.data)
            }
        } catch (error) {
            if (!error.response) {
                console.log('No Internet')
            }
            console.log(error.response)
        }
    }

    const fetchRelatedMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/by_restaurant/${restaurantId}?order_by=category:asc&limit=6`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            if (response.status === 200) {
                const relatedMeals = response.data.data;
                setRelatedMeals(relatedMeals);
            }
        } catch (error) {
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRestaurantData()
        fetchRelatedMeals()
    }, [])

    return (
        <>
        <Header />
        <Container>
            <div className={'container d-flex justify-around align-start ' + styles.restaurantDetailsContainer}>
                <div>
                    <h3>{restaurantData.name}</h3>
                    <div style={{ width: '400px', height: '400px', backgroundColor: "#444" }}>
                        <img src={restaurantData.image} className={styles.restaurantImg} alt="Restaurant Img" width="100%" height="100%" />
                    </div>
                    <div className={styles.adminData}>
                        <img src={restaurantData.profile_image} alt="Restaurant admin's display pic" className="dp-size" />
                        <h5>{restaurantData.firstname} {restaurantData.lastname}</h5>

                        <p>{restaurantData.address}</p>
                        <span>{restaurantData.city}</span>
                        <span>{restaurantData.country}</span>

                        <p>call: {restaurantData.phone}</p>
                        <p>email: {restaurantData.email}</p>
                    </div>
                </div>
                <div className={`container ${styles.restaurantStats}`}>
                    <h3>Restaurant Stats</h3>
                    <h5>Average Rating: <span className={"text-highlight "+ styles.rating}> <h2 className="text-highlight">{restaurantData.average_rating}</h2> /5</span> </h5>
                    <h5>*star*</h5>

                    <h5>Total meal offerings: *insert here*</h5>
                </div>
            </div>

            <div className={'container ' + styles.meals}>
                <h5>Meals by Kobis Foods</h5>
                <div className={styles.mealWrapper}>
                    {
                        relatedMeals.map((meal, index) => (
                            <MealCard 
                                key={index}
                                mealid={meal.mealid}
                                image={meal.mealimage}
                                name={meal.mealname}
                                averageRating={meal.average_rating}
                                ratingCount={meal.rating_count}
                                price={meal.price}
                                details={meal.description}
                           />
                        ))
                    }
                </div>
            </div>
        </Container>
        </>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken })

export default connect(mapStateToProps, null)(RestaurantDetails)