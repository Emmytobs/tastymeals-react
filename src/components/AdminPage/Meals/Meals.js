import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidenav from '../Reusables/Sidenav'
import Overlay from '../../../Utilities/Overlay'
import AddMeal from '../AddMeal/AddMeal'

import { PrimaryButton } from '../../../Utilities/Buttons'
import { Table, TableHead, TableBody, TableRow, TD, TH } from '../Reusables/Table'
import { Input } from '../../../Utilities/Form'

import styles from './Meals.module.css'


function Meals(props) {
    const [toggleOverlay, setToggleOverlay] = useState(false)
    // const [searchMealsInput, setSearchMealsInput] = useState('')

    // const [mealsInLocalState, setMealsInLocalState] = useState(props.meals);

    // const filterMeals = (e) => {
    //     const { value } = e.target;
    //     setSearchMealsInput(value);   
    // }

    // useEffect(() => {
    //     if (searchMealsInput.length) {
    //         const filteredMeals = mealsInLocalState.filter(meal => {
    //             return meal.name.toLocaleLowerCase().indexOf(searchMealsInput.toLocaleLowerCase()) !== -1;
    //         })
    //         return setMealsInLocalState(filteredMeals);
    //     }
    //     setMealsInLocalState(props.meals)
    // }, [searchMealsInput])

    return (
        <div className={styles.mealsContainer}>
            <h2 className={styles.pageTitle}>Meals</h2>
            <div className={'d-flex justify-start align-center ' + styles.filterMealsContainer}>
                {/* <div> */}
                {/* onChange={filterMeals} value={searchMealsInput}  */}
                    <Input type="search" placeholder="Search meals" />
                {/* </div> */}
                <select>
                    <option disabled selected>Status</option>
                    <option>Processing</option>
                    <option>Processed</option>
                    <option>Rejected</option>
                    <option>All</option>
                </select>
                <PrimaryButton onClick={() => setToggleOverlay(!toggleOverlay)}>Add meal</PrimaryButton>
            </div>
            <div className={styles.tableContainer}>
                {/* <div className={styles.tabs}>
                    <span>All</span>
                    <span>To be delivered</span>
                    <span>Pickups</span>
                </div> */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TH>ID</TH>
                            <TH>Image</TH>
                            <TH>Name</TH>
                            <TH>Price</TH>
                            <TH>Description</TH>
                            <TH>Created</TH>
                            <TH>Times ordered</TH>
                            <TH>Rating</TH>
                            <TH>Category</TH>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.meals.length &&
                                props.meals.map((meal, index) => (
                                    <TableRow key={index}>
                                        <TD className={styles.mealId}>{meal.mealid}</TD>
                                        <TD>
                                            <img src={meal.image} alt="Meal img" width="70px" height="70px" className={styles.mealImage} />
                                        </TD>
                                        <TD>{meal.name}</TD>
                                        <TD>{meal.price}</TD>
                                        <TD className={styles.mealDescription}>{meal.description}</TD>
                                        <TD>{meal.createdat}</TD>
                                        <TD>{meal.order_count}</TD>
                                        <TD>{meal.average_rating} ({meal.rating_count})</TD>
                                        <TD>{meal.category}</TD>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
                {!props.meals.length && (
                    <h5>There are no meals to display</h5>
                )}
            </div>
            {!props.restaurantId &&
                (
                    <Overlay>
                        You have not created a restaurant profile yet. 
                        <Link to="/app/admin/create-restaurant-profile">
                            <PrimaryButton>Create one</PrimaryButton>
                        </Link>
                    </Overlay>
                )
            }
            {toggleOverlay && 
            <Overlay closeOverlayHandler={setToggleOverlay}>
                <AddMeal />
            </Overlay>}
        <Sidenav />
        </div>
    )
}

const mapStateToProps = (state) => ({ meals: state.mealsByAdmin, restaurantId: state.user.restaurantId })

export default connect(mapStateToProps, null)(Meals);
