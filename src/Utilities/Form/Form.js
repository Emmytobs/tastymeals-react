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

export function Textarea(props) {
    return (
        <div className={styles.textareaContainer}>
            <textarea className={styles.textarea} {...props} />
        </div>
    )
}

export function Select(props) {
    return (
        <select className={styles.select} {...props}>
            {props.children}
        </select>
    )
}

export function Option(props) {
    return (
        <option className={styles.option}>
            {props.children}
        </option>
    )
}
