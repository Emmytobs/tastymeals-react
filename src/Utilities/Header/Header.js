import React, { useState } from 'react'
import { connect } from 'react-redux';
import Overlay from '../Overlay'

import cart from './icons/cart.png';
import search from './icons/search.png';
import filter from './icons/filter.png';
import dp from './icons/dp.png';

import styles from './Header.module.css';

function Header(props) {
    const [overlay, setOverlay] = useState(false);
    const toggleOverlay = () => setOverlay(!overlay)

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
                    <img src={cart} alt="cart" className="pointer icon-size" onClick={toggleOverlay} />
                </div>
            {/* </div> */}
            {/* <Overlay>
                <div className={'container ' + styles.cartListContainer}></div>
            </Overlay> */}
        </header>
    )
}

const mapStateToProps = ({user}) => ({ 
    profileImage: user.profile_image, 
    firstname: user.firstname, 
    lastname: user.lastname 
})

export default connect(mapStateToProps, null)(Header);