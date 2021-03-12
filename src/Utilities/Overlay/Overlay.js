import React from 'react'
import styles from './Overlay.module.css'

export function Overlay(props) {
    const handleClick = (e) => {
        const { id } = e.target;
        if (id === 'overlay') {
            props.closeOverlayHandler(false)
        }
    }
    return (
        <div id="overlay" className={'d-flex justify-center align-center ' + styles.overlay} onClick={handleClick}>
            {props.children}
        </div>
    )
}

