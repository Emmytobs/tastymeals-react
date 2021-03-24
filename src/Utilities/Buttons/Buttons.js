import React from 'react'
import styles from './Buttons.module.css';

export function PrimaryButton(props) {
    return (
        <button className={`${styles.btn} ${styles.primary}`} {...props}>{props.children}</button>
    )
}

export function SecondaryButton(props) {
    return (
        <button className={`${styles.btn} ${styles.secondary}`} {...props}>{props.children}</button>
    )
}

export function OutlineButton(props) {
    return (
        <button className={`${styles.btn} ${styles.outline}`} {...props}>{props.children}</button>
    )
}
