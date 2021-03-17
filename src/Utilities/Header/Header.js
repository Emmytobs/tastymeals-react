import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import Overlay from '../Overlay'
import Sidebar from '../Sidebar/Sidebar';

import cart from './icons/cart.png';
import search from './icons/search.png';

import styles from './Header.module.css';
import { removeMealFromCart } from '../../redux/dispatchers';

function Header(props) {
    const [overlay, setOverlay] = useState(false);
    const [inputValue, setInputValue] = useState('');
    
    const toggleCart = () => setOverlay(!overlay);
    
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

    const submitForm = (e) => {
        e.preventDefault();
        const inputEl = e.target.children[0];
        props.history.push(`/app/explore?q=${inputEl.value}`)
    }

    return (
        <header className={styles.header}>
            <div className={styles.menuBtn_logo}>
            <button>Menu</button>
                <h3 className={'remove-margin ' + styles.logo}>Tasty <span className="text-highlight">Meals</span></h3>
            </div>
            
            <div className={styles.headerComponents}>
                <div className={styles.searchContainer}>
                    <img src={search} alt="Search icon" className="icon-size" />
                    <form className={styles.searchForm} onSubmit={submitForm}>
                        <input 
                            type="search" 
                            placeholder="What do you want to eat?" 
                            onChange={handleChange}
                            value={inputValue} />
                    </form>
                </div>
                <div className={styles.user}>
                    <img src={cart} alt="cart" className="pointer icon-size" onClick={toggleCart} />
                </div>
            </div>
            
            { // Overlay for the cart items
            overlay && 
            <Overlay>
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