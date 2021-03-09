import React from 'react'
import styles from './RestaurantDetails.module.css';

export function RestaurantDetails() {
    return (
        <>
            <div className={'container d-flex justify-around align-center ' + styles.restaurantDetailsContainer}>
                <div>
                    <h3>Kobis Foods</h3>
                    <div style={{ width: '400px', height: '400px', backgroundColor: "#444" }}></div>
                    <div className={styles.adminData}>
                        <img src="*dp*" alt="Restaurant admin's display pic" className="dp-size" />
                        <h5>Jumai Alabi</h5>
                        <span>call</span>
                        <span>email</span>
                    </div>
                </div>
                <div className={`container ${styles.restaurantStats}`}>
                    <h3>Restaurant Stats</h3>
                    <h5>Average Rating: <span className="text-highlight"> <h3 className="text-highlight">4</h3>/5</span> </h5>
                    <h5>*star*</h5>

                    <h5>Total meal offerings: 5</h5>
                </div>
            </div>

            <div className={styles.meals}>
                
            </div>
        </>
    )
}
