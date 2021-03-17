import React from 'react'
import Header from '../../../Utilities/Header/Header'
import styles from './Explore.module.css'

function Explore(props) {
    return (
        <>
        <Header {...props} />
        <div className={styles.exploreContainer}>
            <h1>Explore Page</h1>
        </div>
        </>
    )
}

export default Explore
