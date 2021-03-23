import React, { useEffect } from 'react'
import styles from './Overlay.module.css'

export function Overlay(props) {
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflowY = 'hidden'
        return () => {
            body.style.overflowY = 'scroll'
        }
    }, [])
    
    const handleClick = (e) => {
        const { id } = e.target;
    
        if (id === 'overlay' || id === props.targetId) {
            props.closeOverlayHandler && props.closeOverlayHandler(props.closeOverlayHandlerArg || false)
        }
    }
    return (
        <div id="overlay" className={'d-flex justify-center align-center ' + styles.overlay} onClick={handleClick}>
            {props.children}
        </div>
    )
}

