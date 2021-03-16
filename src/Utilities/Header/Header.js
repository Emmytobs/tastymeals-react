import React, { useState } from 'react'
import { connect } from 'react-redux';
import Overlay from '../Overlay'

import cart from './icons/cart.png';
import search from './icons/search.png';
import filter from './icons/filter.png';
import dp from './icons/dp.png';

import styles from './Header.module.css';
import { removeMealFromCart } from '../../redux/dispatchers';

function Header(props) {
    const [overlay, setOverlay] = useState(false);
    const toggleCart = () => setOverlay(!overlay)

    return (
        <header className={'d-flex justify-between align-center ' + styles.header}>
            <h2 className={'remove-margin ' + styles.logo}>Tasty Meals</h2>
            
            {/* <div className='d-flex align-center'> */}
                <div className={styles.searchContainer}>
                    <img src={search} alt="Search icon" className="icon-size" />
                    <input type="search" placeholder="What do you want to eat?" />
                    <img src={filter} alt="Filter icon" className="icon-size" />
                </div>
                <div className={styles.userData}>
                    {
                        props.profileImage ? 
                        <img src={props.profileImage} alt="dp" className="dp-size" /> :
                        <img src={dp} alt="dp" className="dp-size" />
                    }
                    <h5>{props.firstname} {props.lastname}</h5>
                    <img src={cart} alt="cart" className="pointer icon-size" onClick={toggleCart} />
                </div>
            
            { // Overlay for the cart items
            overlay && <Overlay>
                <div className={'container ' + styles.cartListContainer}>
                    <button onClick={toggleCart}>Close</button>
                    <h2>Cart</h2>
                    <div className={styles.cartItems}>
                        {props.cart.map(item => (
                            <div key={item.id}>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <span className="inline-link">{item.restaurantName}</span> <br />
                                <span>{item.averageRating} ({item.ratingCount})</span>
                                <button onClick={() => removeMealFromCart(item.id, props.dispatch)}>Remove</button>
                            </div>
                        ))}
                        {props.cart.length && <button>Checkout</button>}
                        {!props.cart.length && <p>No item in cart</p>}
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
    cart: state.cart
})

export default connect(mapStateToProps, null)(Header);