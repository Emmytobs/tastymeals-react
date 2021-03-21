import React from 'react'
import styles from './Footer.module.css'

export function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={'d-flex justify-between align-center'}>
                <small>&copy; 2021 Tasty Meals</small>
                <div>
                    <small>Privacy Policy </small>
                    |
                    <small> Terms</small>
                </div>
            </div>
        </div>
    )
}