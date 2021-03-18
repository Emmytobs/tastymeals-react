import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import Overlay from '../Overlay'

import cart from './icons/cart.png';
import cancel from './icons/cancel.png';
import search from './icons/search.png';

import styles from './Header.module.css';
import { removeOrder } from '../../redux/dispatchers';
import { PrimaryButton } from '../Buttons';
import axios from 'axios';

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
        const order = {
            mealId: props.order.mealid,
            restaurantId: props.order.restaurantid,
            ...orderData
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/order`,
                order,
                { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
            )
            console.log(response)
        } catch (error) {
            if (!error.response) {
                return console.log("No internet")
            }
            console.log(error)
        }
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
                <button onClick={toggleMenu}>Menu</button>
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
                        <span className={styles.orderCount}>1</span>
                    </div>
                </div>
            </div>
            
            { // Overlay for the cart items
            cartOverlay && 
            <div className={'container ' + styles.orderContainer}>
                <img src={cancel} alt="Close order modal" title="Close modal" className={styles.closeOrderModal} onClick={toggleCart} />
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
                            <select name="orderQuantity" value={orderData.orderQuantity} onChange={handleOrderData}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <p>{props.order.mealname}</p>
                        </div>
                        
                        <span>{props.order.price * orderData.orderQuantity}</span>
                    </div>
                    <input 
                        name="orderNote" 
                        value={orderData.orderNote}
                        onChange={handleOrderData}
                        placeholder="(Optional) Add a note for the restaurant" />                
                    <PrimaryButton onClick={submitOrder}>Checkout</PrimaryButton>
                </div>
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