import React from 'react';
import Sidebar from '../Sidebar/Sidebar'

import styles from './Container.module.css'


export function Container(props) {
    return (
        <>
        <div className={styles.appWrapper}>
            <div className={styles.appContainer}>
                {props.children}
            </div>
            <Sidebar {...props} />
        </div>
        </>
    )
}
