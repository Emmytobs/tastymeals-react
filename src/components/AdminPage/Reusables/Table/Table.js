import React from 'react'
import styles from './Table.module.css'

export function Table(props) {
    return (
        <table className={'container '+ styles.table} {...props}>
            {props.children}
        </table>
    )
}

export function TableHead(props) {
    return (
        <thead {...props}>
            {props.children}
        </thead>
    )
}

export function TableBody(props) {
    return (
        <tbody {...props}>
            {props.children}
        </tbody>
    )
}

export function TableRow(props) {
    return (
        <tr {...props}>
            {props.children}
        </tr>
    )
}

export function TH(props) {
    return (
        <th {...props}>{props.children}</th>
    )
}

export function TD(props) {
    return (
        <td {...props}>{props.children}</td>
    )
}

// <table className={'container '+ styles.table}>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Created</th>
//                             <th>Customer</th>
//                             <th>Item</th>
//                             <th>Delivery Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>15 Jul 2020</td>
//                             <td>Michael Opah</td>
//                             <td>Chicken Paella Rice</td>
//                             <td>Processing</td>
//                         </tr>
//                         <tr>
//                             <td>2</td>
//                             <td>18 Jul 2020</td>
//                             <td>John Papa</td>
//                             <td>Plantain Fritata + fries</td>
//                             <td>Processing</td>
//                         </tr>
//                     </tbody>
//                 </table>