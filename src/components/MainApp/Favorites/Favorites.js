import React from 'react'
import { connect } from 'react-redux'
import Header from '../../../Utilities/Header/Header'
import Footer from '../../../Utilities/Footer'

import styles from './Favorites.module.css'
import MealCard from '../../../Utilities/MealCard/MealCard'

function Favorites(props) {
    // console.log(props.favorites)
    return (
        <>
          <Header />  
          <div className={styles.favoritesContainer}>
            <h3>Your favorites</h3>
            <div className={styles.mealWrapper}>
                {
                    props.favorites.map((meal, index) => (
                        <MealCard
                            key={index}
                            id={index}
                            mealid={meal.mealid}
                            image={meal.image}
                            name={meal.name}
                            averageRating={meal.averageRating}
                            ratingCount={meal.ratingCount}
                            restaurantName={meal.restaurantName}
                            restaurantId={meal.restaurantId}
                            price={meal.price}
                            details={meal.details}
                        />
                    ))
                }
            </div>
          </div>
          <Footer />  
        </>
    )
}

const mapStateToProps = (state) => { 
    return {
        favorites: state.meals['FAVORITES'] 
    }
}

export default connect(mapStateToProps, null)(Favorites)
