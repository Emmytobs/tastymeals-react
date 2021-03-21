import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import Overlay from '../Overlay'

import cart from './icons/cart.png';
import cancel from './icons/cancel.png';
import search from './icons/search.png';
import menu from './icons/menu.png';

import styles from './Header.module.css';
import { addOrder, removeOrder } from '../../redux/dispatchers';
import { PrimaryButton, SecondaryButton } from '../Buttons';
import axios from 'axios';
import { Input } from '../Form';
import { Form, Option, Select } from '../Form/Form';

function Header(props) {
    const [cartOverlay, setCartOverlay] = useState(false);
    const [menuOverlay, setMenuOverlay] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [orderData, setOrderData] =  useState({
        orderQuantity: 1,
        orderNote: ''
    });

    const handleOrderData = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value })
    }
    
    const submitOrder = async () => {
        // const order = {
        //     mealId: props.order.mealid,
        //     restaurantId: props.order.restaurantid,
        //     ...orderData
        // };
        // try {
        //     const response = await axios.post(
        //         `${process.env.REACT_APP_API_URL}/order`,
        //         order,
        //         { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
        //     )
        //     console.log(response)
        // } catch (error) {
        //     if (!error.response) {
        //         return console.log("No internet")
        //     }
        //     console.log(error)
        // }
        const order = {
            mealId: props.order.mealid,
            restaurantId: props.order.restaurantid,
            ...orderData
        };
        addOrder(order, props.dispatch);
        props.history.push('/app/checkout')
    }

    const cancelOrder = () => {
        removeOrder(null, props.dispatch)
    }

    const toggleCart = () => setCartOverlay(!cartOverlay);
    const toggleMenu = () => setMenuOverlay(!menuOverlay);
    const logoutUser = () => {
        localStorage.removeItem('tasty-meals-app-state');
        props.history.push('/account')
    }
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const searchQuery = useQuery().get('q');
    const searchParams = useLocation().search;
    useEffect(() => {
        searchQuery && setInputValue(searchQuery)
    }, [])

    useEffect(() => {
        if (!searchQuery) {
            setInputValue('')
        }
    }, [searchParams])
    
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const submitMealQuery = (e) => {
        e.preventDefault();
        const inputEl = e.target.children[0];
        props.history.push(`/app/explore?q=${inputEl.value}`)
    }

    return (
        <header className={styles.header}>
            <div className={styles.menuBtn_logo}>
                <img 
                    src={menu} 
                    alt='Menu icon' 
                    className="dp-size" 
                    onClick={toggleMenu} 
                    title="Open side menu"
                    style={{ cursor: 'pointer' }} />
                <Link to="/app" title="Back to homepage" >
                    <h3 className={'remove-margin ' + styles.logo}>Tasty <span className="text-highlight">Meals</span></h3>
                </Link>
            </div>
            
            <div className={styles.headerComponents}>
                <div className={styles.searchContainer}>
                    <img src={search} alt="Search icon" className="icon-size" />
                    <form className={styles.searchForm} onSubmit={submitMealQuery}>
                        <input 
                            type="search" 
                            placeholder="What do you want to eat?" 
                            onChange={handleChange}
                            value={inputValue} />
                    </form>
                </div>
                <div className={styles.ordersBtn} onClick={toggleCart} >
                    <div className='d-flex justify-center align-center'> 
                        <img src={cart} alt="cart" className={styles.orderIcon}/>
                        <span className={styles.orderCount}>
                            {
                                Object.keys(props.order).length ? 1 : 0
                            }
                        </span>
                    </div>
                </div>
            </div>
            
            { // Overlay for the cart items
            cartOverlay && 
            <div className={'container ' + styles.orderContainer}>
                <img src={cancel} alt="Close order modal" title="Close modal" className={styles.closeOrderModal} onClick={toggleCart} />
                {
                Object.keys(props.order).length ?
                <>
                    <h4>Your Order</h4>
                    <div className={styles.order}>
                        <p className={styles.restaurantName}>
                            From 
                            <Link to={`/app/restaurant/${props.order.restaurantid}`} className="inline-link">
                                {props.order.name}
                            </Link>
                        </p>
                        <div className={'d-flex justify-between align-center ' + styles.quantity_price}>
                            <div>
                                <Select name="orderQuantity" value={orderData.orderQuantity} onChange={handleOrderData}>
                                    <Option>1</Option>
                                    <Option>2</Option>
                                    <Option>3</Option>
                                </Select>
                                <p>{props.order.mealname}</p>
                            </div>
                            
                            <span>{props.order.price * orderData.orderQuantity}</span>
                        </div>
                        <Input 
                            name="orderNote" 
                            value={orderData.orderNote}
                            onChange={handleOrderData}
                            style={{ marginTop: '20px' }}
                            placeholder="(Optional) Add a note for the restaurant" />
                        <PrimaryButton 
                            onClick={submitOrder}
                            style={{ marginTop: "20px", width: "100%" }}>Checkout</PrimaryButton>
                        <SecondaryButton 
                            onClick={cancelOrder}
                            style={{ marginTop: "10px", width: "100%" }}>Cancel order</SecondaryButton>
                    </div>
                </> : 
                <>
                <h4>You have no order.</h4>
                </>
                }
            </div>
            }

            { // Overlay for the menu
                menuOverlay && 
                <Overlay closeOverlayHandler={setMenuOverlay}>
                    <div className={'container '+ styles.menuWrapper}>
                        <div className={styles.menuContainer}>
                            <ul>
                                <li>
                                    <Link to="/app">Home</Link>
                                </li>
                                <li>
                                    <Link to="/app/explore">Explore</Link>
                                </li>
                                <li>
                                    <Link to="/app/favorites">Favorites</Link>
                                </li>
                                <li>
                                    <Link to="/app/notifications">Notifications</Link>
                                </li>
                                {
                                props.type === 'RESTAURANT_ADMIN' && (
                                    <li>
                                        <Link to="/app/admin">Admin Area</Link>
                                    </li>
                                )}
                            </ul>
                            <div className={styles.profile}>
                                <Link to="/app/profile">
                                    <img 
                                        src={cancel} 
                                        alt="Your profile pic" 
                                        title="Your profile picture" 
                                        className='dp-size' />
                                    <span>{props.firstname} {props.lastname}</span>
                                </Link>
                                <PrimaryButton onClick={logoutUser}>Logout</PrimaryButton>
                            </div>
                        </div>
                    </div>
                </Overlay>
            }
        </header>
    )
}

const mapStateToProps = (state) => ({ 
    profileImage: state.user.profile_image, 
    firstname: state.user.firstname, 
    lastname: state.user.lastname,
    type: state.user.type,
    order: state.order,
    accessToken: state.accessToken
})

export default connect(mapStateToProps, null)(Header);