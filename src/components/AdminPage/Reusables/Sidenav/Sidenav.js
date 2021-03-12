import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Sidenav.module.css'

import mealsIcon from './icons/meals.png'
import ordersIcon from './icons/orders.png'
import profileIcon from './icons/profile.png'

export function Sidenav() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (!sidebarIsOpen) {
            return sidebarRef.current.classList.add(styles.closed);
        }
        sidebarRef.current.classList.remove(styles.closed);
    }, [sidebarIsOpen]);

    const logoutUser = async () => {
        try {
            localStorage.removeItem('tasty-meals-app-state')
            window.location = '/account/login'
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        // <Overlay>
            <div ref={sidebarRef} className={`container ${styles.sidebar} ${styles.closed}`}>
                <div className={styles.listMenu}>
                    <button onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>Click</button>
                    <Link to="/app/admin/meals">
                        <div className={'d-flex justify-between align-center ' + styles.listItem}>
                            <p>Meals</p>
                            <img src={mealsIcon} alt="Meals" width='32px' height="32px" />
                        </div>
                    </Link>

                    <Link to="/app/admin/orders">
                        <div className={'d-flex justify-between align-center ' + styles.listItem}>
                            <p>Orders</p>
                            <img src={ordersIcon} alt="Orders" width='32px' height="32px" />
                        </div>
                    </Link>

                    <Link to="/app/admin/my-restaurant">
                        <div className={'d-flex justify-between align-center ' + styles.listItem}>
                            <p>My Restaurant</p>
                            <img src={profileIcon} alt="Restaurant" width='32px' height="32px" />
                        </div>
                    </Link>

                    <button onClick={logoutUser}>Logout</button>
                </div>
            </div>
        // </Overlay>
    )
}
