import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { PrimaryButton, SecondaryButton } from '../../../Utilities/Buttons'
import styles from './MealDetails.module.css'

import { addOrder } from '../../../redux/dispatchers'

import Header from '../../../Utilities/Header/Header'
import Container from '../../../Utilities/Container'
import axios from 'axios'
import Footer from '../../../Utilities/Footer'
import { Option, Select, Textarea } from '../../../Utilities/Form/Form'
import MealCard from '../../../Utilities/MealCard/MealCard'
import Overlay from '../../../Utilities/Overlay'

function MealDetails(props) {
    const [meal, setMeal] =  useState([]);
    const [relatedMeals, setRelatedMeals] =  useState([]);
    const [ratings, setRatings] =  useState([]);
    const [userCanReviewMeal, setUserCanReviewMeal] = useState(false);
    const [reviewByUser, setReviewByUser] = useState(false);
    const [message, setMessage] = useState('')
    const [replaceOrderModal, setReplaceOrderModal] = useState(false);
    const [orderExistsModal, setOrderExistsModal] = useState(false);
    
    const [createdRating, setCreatedRating] = useState({ rating: 1, review: '' });
    
    const [activeTab, setActiveTab] = useState('reviews');
    const toggleActiveTab = (e) => {
        const name = e.target.getAttribute('name');
        setActiveTab(name)
    }

    const orderMeal = (options) => {
        // Check if the order's meal id is the same as that of the meal user wants to order
        if (props.order.mealid === meal.mealid) {
            return setOrderExistsModal(true)
        }
        // Check it an order is present already
        const orderIsPresent = Object.keys(props.order).length;
        if (orderIsPresent && !options.replace) {
            return setReplaceOrderModal(true)
        }
        const { mealid, mealname, price, name, restaurantid } = meal;
        addOrder({ mealid, mealname, price, name, restaurantid }, props.dispatch)
        setReplaceOrderModal(false)
    }
    const { mealId } = useParams();

    const submitReviewVerification = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/rating/meal/${mealId}/order-verification`,
                { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
            )
            if (response.status === 204) {
                setMessage('You can review this meal once you order it')
                return;
            }
            return setUserCanReviewMeal(true);
            
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleRatingChange = (e) => {
        const {name, value} = e.target;
        setCreatedRating({ ...createdRating, [name]: value })
    }
    const submitRating = async (e) => {
        e.preventDefault()
        try {
            const rating = {
                rating: createdRating.rating,
                review: createdRating.review,
                mealId: meal.mealid
            }
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/rating/meal`,
                rating,
                { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
            )
            if (response.status === 201) {
                fetchReviews();
                fetchLoggedInUserReview();
                setUserCanReviewMeal(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMeal = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/${mealId}`, { 
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            console.log(response)
            if (response.status === 200) {
                return setMeal(response.data.data);
            }
        } catch (error) {
            if (!error.response) {
                return console.log('No internet')
            }
            if(error.response.status === 404) {
                return console.log('Meal not found')
            }
            console.log(error.response)
        }
    }

    const fetchRelatedMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken },
                params: {
                    columnFilter: `category:${meal.category}`,
                    limit: "6"
                }
            });
            if (response.status === 200) {
                const relatedMeals = response.data.data;
                setRelatedMeals(relatedMeals);
            }
        } catch (error) {
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error.response)
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/rating/meal/${mealId}`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            })
            if (response.status === 200 && response.data.data) {
                return setRatings(response.data.data)
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    const fetchLoggedInUserReview = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/rating/meal/${mealId}/user/${props.userId}`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            if (response.status === 204) {
                return;
            }
            return setReviewByUser(response.data.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchMeal();
        fetchReviews();
        fetchLoggedInUserReview()
    }, [])

    return (
        <>
        <Header {...props} />
        <div className={styles.mealDetailsWrapper}>
            <div className={'d-flex justify-center align-center '+ styles.mealDetailsContainer}>
                <div className={styles.imageContainer}>
                    <img src={meal.mealimage} alt="Meal Img" width="300px" height="300px" />
                </div>
                <div className={styles.mealDetails}>
                    <h5>{meal.mealname}</h5>
                    <Link to={`/app/restaurant/${meal.restaurantid}`} className="inline-link">{meal.name}</Link>
                    {/* <div className={styles.mealRating}>
                        <span className={styles.averageRating}>{meal.average_rating} ({meal.rating_count})</span>
                    </div> */}
                    <p>{meal.description}</p>
                    <div className={'d-flex justify-between align-center ' + styles.price_addToCart}>
                        <h5>{meal.price}</h5>
                        <div className={styles.buttons}>
                            <PrimaryButton onClick={orderMeal}>Order</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.moreContent}>
                <div className={'d-flex justify-center align-center '+ styles.tabContainer}>
                    <span className={styles.tab}>
                        <h6 name="reviews" onClick={toggleActiveTab}>Ratings & Reviews</h6>
                        {activeTab === 'reviews' && <span className={styles.active}></span>}
                    </span>
                    <span className={styles.tab}>
                        <h6 
                            name="related_meals" 
                            onClick={(e) => {
                                toggleActiveTab(e);
                                fetchRelatedMeals();
                            }}>Related meals</h6>
                        {activeTab === 'related_meals' && <span className={styles.active}></span>}
                    </span>
                </div>
                {
                    activeTab === 'reviews' ? (
                    <div className={styles.reviewsWrapper}>
                                <div className={styles.ownReviewContainer}>
                                    {
                                        !reviewByUser && (
                                            <PrimaryButton 
                                                onClick={submitReviewVerification}
                                                style={{ width: 'auto', display: 'block', margin: '0 auto' }}>Write a review</PrimaryButton>
                                                
                                        )
                                    }
                                    {message && <p style={{ textAlign: 'center', marginTop: '20px' }}>{message}</p>}
                                    
                                    {userCanReviewMeal &&
                                    <form onSubmit={submitRating} className={styles.reviewForm}>
                                        <div className={styles.ratingSelect}>
                                            <p>Rating:</p>
                                            <Select name="rating" value={createdRating.rating} onChange={handleRatingChange}>
                                                <Option>1</Option>
                                                <Option>2</Option>
                                                <Option>3</Option>
                                                <Option>4</Option>
                                                <Option>5</Option>
                                            </Select>
                                        </div>
                                        <Textarea name="review" value={createdRating.review} onChange={handleRatingChange} placeholder="Write a review" />
                                        <PrimaryButton type="submit" >Submit</PrimaryButton>
                                    </form>}
                                    {reviewByUser && 
                                    <div className={styles.currentUserReview}>
                                        <h3>Your review</h3>
                                        <p>{reviewByUser.review}
                                        </p>
                                    </div>}
                                </div>
                        {
                            ratings.length ? (
                                <>
                                <div className={styles.otherReviews}>
                                    {
                                    ratings
                                    .filter(rating => rating.ratingid !== reviewByUser.ratingid)
                                    .map((rating, index) => 
                                            (
                                                <div key={index} className={'container ' + styles.reviewCard}>
                                                    <p className={styles.rating}>{rating.rating}</p>
                                                    <p className={styles.reviewContent}>
                                                        {rating.review}
                                                    </p>
                                                    <p className={styles.user}>{rating.firstname} {rating.lastname}</p>
                                                </div>
                                            )
                                    )
                                    }
                                </div>
                                </>
                            ) :
                            (
                                <h4 style={{ textAlign: 'center', marginTop: '40px' }}>No ratings for this meal</h4>
                            )
                        }
                    </div>
                    ) :
                    (
                        <div className={styles.relatedMealsWrapper}>
                            {
                                relatedMeals.map((meal, index) => (
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
                    )
                }
            </div>
        </div>
        {
            replaceOrderModal &&
            <ReplaceOrderModal 
                setReplaceOrderModal={setReplaceOrderModal} 
                replaceOrderFunction={() => orderMeal({ replace: true })} mealname={meal.mealname} />
        }
        {
            orderExistsModal &&
            <OrderExistsModal setOrderExistsModal={setOrderExistsModal} />
        }
        <Footer />
        </>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken, order: state.order, userId: state.user.userId })

export default connect(mapStateToProps, null)(MealDetails)

function ReplaceOrderModal(props) {
    return (
        <Overlay closeOverlayHandler={props.setReplaceOrderModal} targetId="target">
            <div className={'container '+ styles.replaceOrderModal}>
                <h4>You already have an order.</h4>
                <h6 style={{ marginTop: '20px' }}>Do you want to replace it with {props.mealname}?</h6>
                <div className={'d-flex justify-end align-center ' + styles.ctaButtons}>
                    <SecondaryButton id="target">Cancel</SecondaryButton>
                    <PrimaryButton onClick={props.replaceOrderFunction}>Replace</PrimaryButton>
                </div>
            </div>
        </Overlay>
    )
}

function OrderExistsModal(props) {
    return (
        <Overlay closeOverlayHandler={props.setOrderExistsModal}>
            <div className={'container'}>
                <p>
                    An order already exists for the same item
                </p>
            </div>
        </Overlay>
    )
}