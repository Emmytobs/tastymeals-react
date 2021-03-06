import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidenav from '../Reusables/Sidenav'
import Overlay from '../../../Utilities/Overlay'
import AddMeal from '../AddMeal/AddMeal'

import { PrimaryButton, SecondaryButton } from '../../../Utilities/Buttons'
import { Table, TableHead, TableBody, TableRow, TD, TH } from '../Reusables/Table'
import { Input } from '../../../Utilities/Form'

import styles from './Meals.module.css'
import axios from 'axios'
import dayjs from 'dayjs'
import { saveAdminRestaurantProfile, saveMeals } from '../../../redux/dispatchers'
import { Option, Select, Textarea } from '../../../Utilities/Form/Form'


function Meals(props) {
    const [addMealModal, setAddMealModal] = useState(false)
    const [searchMealQuery, setSearchMealQuery] = useState('')
    const [viewMealModal, setViewMealModal] = useState(false)

    const [meals, setMeals] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [filters, setFilters] = useState({ filterBy: 'mealname' });
    const changeFilterBy = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value })
    }

    const filterMeals = (e) => {
        const { value } = e.target;
        setSearchMealQuery(value);   
        // console.log(e.target.value)
    }

    useEffect(() => {
        if (searchMealQuery.length) {
            const mealsFiltered = meals.filter(meal => {
                return meal[filters.filterBy].toLocaleLowerCase().indexOf(searchMealQuery.toLocaleLowerCase()) !== -1;
            })
            return setFilteredMeals(mealsFiltered);
        }
        setFilteredMeals(meals);
    }, [searchMealQuery])

    const fetchMeals = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/admin`, { 
                headers: { 'Authorization': 'Bearer ' + props.accessToken } 
            })
            if (response.status === 200 && response.data.data) {
                setFilteredMeals(response.data.data)
                return setMeals(response.data.data)
            }
        } catch (error) {
            if(!error.response) {
                console.log('No Internet')
            }
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchMeals()
    }, [])

    const viewMeal = (meal) => {
        setViewMealModal(meal)
    }

    const updateMeal = (updatedMeal) => {
        const updatedMeals = meals.map(meal => {
            if (meal.mealid === updatedMeal.mealid) {
                return updatedMeal
            }
            return meal
        });
        setFilteredMeals(updatedMeals)
        setMeals(updatedMeals)
        setViewMealModal(false)
    }

    const addNewMeal = (newMeal) => {
        setMeals([ ...meals, {...newMeal} ])
        setFilteredMeals([ ...meals, {...newMeal} ])
        setAddMealModal(false)
    }

    const deleteMeal = (mealid) => {
        const updatedMeals = meals.filter(meal => meal.mealid !== mealid)
        console.log(updatedMeals)
        setMeals(updatedMeals)
        setFilteredMeals(updatedMeals)
        setViewMealModal(false)
    }

    return (
        <div className={styles.mealsContainer}>
            <h2 className={styles.pageTitle}>Meals</h2>
            <p>by {props.restaurantProfile.name}</p>
            <div className={'d-flex justify-start align-center ' + styles.filterMealsContainer}>
                <Input type="search" onChange={filterMeals} value={searchMealQuery} placeholder="Search meals" />
                <div>
                    <span>Filter by: </span>
                    <Select name='filterBy' onChange={changeFilterBy} value={filters.filterBy}>
                        <Option disabled selected>Status</Option>
                        <Option>mealname</Option>
                        <Option>categoryname</Option>
                    </Select>
                </div>
                <PrimaryButton onClick={() => setAddMealModal(true)}>Add meal</PrimaryButton>
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
                            filteredMeals.length &&
                                filteredMeals.map((meal, index) => (
                                    <TableRow key={index} onClick={() => viewMeal(meal)}>
                                        <TD className={styles.mealId}>{meal.mealid}</TD>
                                        <TD>
                                            <img src={meal.mealimage} alt="Meal img" width="70px" height="70px" className={styles.mealImage} />
                                        </TD>
                                        <TD>{meal.mealname}</TD>
                                        <TD>{meal.price}</TD>
                                        <TD className={styles.mealDescription}>{meal.description}</TD>
                                        <TD>
                                            {
                                                dayjs(meal.createdat).format('D MMM YY')
                                            }
                                        </TD>
                                        <TD>{meal.order_count}</TD>
                                        <TD>{meal.average_rating} ({meal.rating_count})</TD>
                                        <TD>{meal.categoryname}</TD>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
                {!filteredMeals.length && (
                    <h5>There are no meals to display</h5>
                )}
            </div>
           
            {addMealModal && 
            <Overlay closeOverlayHandler={setAddMealModal}>
                <AddMeal addNewMeal={addNewMeal} />
            </Overlay>}
            {
                viewMealModal && 
                <ViewMeal 
                    viewMealModal={viewMealModal} 
                    setViewMealModal={setViewMealModal} 
                    accessToken={props.accessToken}
                    updateMeal={updateMeal}
                    deleteMeal={deleteMeal} />
            }
        <Sidenav />
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken, restaurantProfile: state.adminRestaurantProfile })

export default connect(mapStateToProps, null)(Meals);

function ViewMeal(props) {
    const { viewMealModal: meal } = props;
    const [changeableMealData, setChangeableMealData] = useState({
        mealname: meal.mealname,
        price: meal.price,
        description: meal.description,
    });
    const [updatedMealData, setUpdatedMealData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMealData({ ...updatedMealData, [name]: value })
        setChangeableMealData({ ...changeableMealData, [name]: value })
    }

    const saveChanges = async () => {
        setIsSubmitting(true)
        if (!Object.keys(updatedMealData).length) {
            return console.log('No field changed')
        }
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/meal/${meal.mealid}`,
                updatedMealData,
                { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
            );
            if (response.status === 200) {
                setIsSubmitting(false)
                const { data: updatedMeal } = response.data;
                props.updateMeal(updatedMeal)
            }
        } catch (error) {
            setIsSubmitting(false)
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error.response)
        }
    }

    const deleteMeal = async () => {
        setIsSubmitting(true)
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/meal/${meal.mealid}`,{
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            })
            if (response.status === 200) {
                setIsSubmitting(false)
                props.deleteMeal(meal.mealid)
            }
        } catch (error) {
            setIsSubmitting(false)
            console.log(error)
        }
    }

    return (
        <Overlay closeOverlayHandler={props.setViewMealModal} targetId='targetToCloseModal'>
            <div style={{ opacity: isSubmitting ? 0.7 : 1 }} className={'container '+ styles.viewMealModal}>
                <div className={'d-flex justify-between align-start '}>
                    <div>
                        <img src={meal.mealimage} alt="Your meal" width="250px" height="auto" />
                        <p>Average rating: {meal.average_rating}</p>
                        <p>Times rated: {meal.rating_count}</p>
                        <p>Times ordered: {meal.order_count}</p>
                        <p>Category: {meal.categoryname}</p>
                        <p>Created at: {meal.createdat}</p>
                    </div>
                    <div className={styles.inputGroup}>
                        <div>
                            <p>Name:</p>
                            <Input 
                                onChange={handleInputChange}
                                type="text"
                                name="mealname"
                                value={changeableMealData.mealname} />
                        </div>
                        <div>
                            <p>Price:</p>
                            <Input 
                                onChange={handleInputChange}
                                type="number"
                                name="price"
                                value={changeableMealData.price} />
                        </div>
                        <div>
                            <p>Description:</p>
                            <Textarea 
                                onChange={handleInputChange}
                                name="description"
                                resize='vertical' 
                                value={changeableMealData.description} />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '30px' }} className={'d-flex justify-between align-center'}>
                    <PrimaryButton onClick={deleteMeal}>Delete meal</PrimaryButton>
                    <div className={styles.ctaButtons}>
                        <SecondaryButton id="targetToCloseModal">Cancel</SecondaryButton>
                        <PrimaryButton onClick={saveChanges}>Save</PrimaryButton>
                    </div>
                </div>
            </div>
        </Overlay>
    )
}