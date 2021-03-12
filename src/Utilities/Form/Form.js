import React from 'react'
import styles from './Form.module.css'

export function Form(props) {
    return (
        <form className={'container ' + styles.form} style={{...props.style}} {...props}>
            {props.children}
        </form>
    )
}

export function Input(props) {
    return (
        <div className={'d-flex justify-center align-center ' + styles.inputContainer}>
            <input className={styles.input} {...props} />
        </div>
    )
}
