import React from 'react'

import cart from './icons/cart.png';
import search from './icons/search.png';
import filter from './icons/filter.png';
import dp from './icons/dp.png';

import styles from './Header.module.css';

export function Header() {
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
                    <img src={dp} alt="dp" className="dp-size" />
                    <h5>George Washington</h5>
                    <img src={cart} alt="cart" className="pointer icon-size" />
                </div>
            {/* </div> */}
        </header>
    )
}