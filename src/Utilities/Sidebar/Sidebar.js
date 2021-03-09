import React from 'react'
import styles from './Sidebar.module.css';

export function Sidebar(props) {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.listContainer}>
                <div className={styles.listItem}>
                    <h5>Home</h5>
                    <span className={styles.active}></span>
                </div>
                <div className={styles.listItem}>
                    <h5>Explore</h5>
                    <span className={styles.active}></span>
                </div>
                <div className={styles.listItem}>
                    <h5>Wishlist</h5>
                    <span className={styles.active}></span>
                </div>
                <div className={styles.listItem}>
                    <h5>Orders</h5>
                    <span className={styles.active}></span>
                </div>
                <div className={styles.listItem}>
                    <h5>Profile</h5>
                    <span className={styles.active}></span>
                </div>
            </div>
        </div>
    )
}
