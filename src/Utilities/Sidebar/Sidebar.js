import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar(props) {
    const [activeTab, setActive] = useState('home');

    const handleClick = (e, activeTabName) => {
        setActive(activeTabName)
    }

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.listContainer}>
                <Link to="/app" onClick={(e) => handleClick(e, 'home')}>
                    <div className={styles.listItem}>
                        <h5>Home</h5>
                        {activeTab === 'home' && <span className={styles.active}></span>}
                    </div>
                </Link>
                <Link to="/app/explore" onClick={(e) => handleClick(e, 'explore')}>
                    <div className={styles.listItem} >
                        <h5>Explore</h5>
                        {activeTab === 'explore' && <span className={styles.active}></span>}
                    </div>
                </Link>
                <Link to="/app/favorites" onClick={(e) => handleClick(e, 'favorites')}>
                    <div className={styles.listItem}>
                        <h5>Favorites</h5>
                        {activeTab === 'favorites' && <span className={styles.active}></span>}
                    </div>
                </Link>
                <Link to="/app/orders" onClick={(e) => handleClick(e, 'orders')}>
                    <div className={styles.listItem}>
                        <h5>Orders</h5>
                        {activeTab === 'orders' && <span className={styles.active}></span>}
                    </div>
                </Link>
                <Link to="/app/profile" onClick={(e) => handleClick(e, 'profile')}>
                    <div className={styles.listItem}>
                        <h5>Profile</h5>
                        {activeTab === 'profile' && <span className={styles.active}></span>}
                    </div>
                </Link>
                {
                props.userType === 'RESTAURANT_ADMIN' &&
                (<Link to="/app/admin" onClick={(e) => handleClick(e, 'admin')}>
                    <div className={styles.listItem}>
                        <h5>Admin area</h5>
                        {activeTab === 'admin' && <span className={styles.active}></span>}
                    </div>
                </Link>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ user }) => ({ userType: user.type })

export default connect(mapStateToProps, null)(Sidebar)