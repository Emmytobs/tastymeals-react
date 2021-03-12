import React from 'react'
import Sidenav from '../Reusables/Sidenav'
import { Table, TableHead, TableBody, TableRow, TD, TH } from '../Reusables/Table'

import { Input } from '../../../Utilities/Form'

import styles from './Orders.module.css'


function Orders(props) {
return (
        <div className={styles.ordersContainer}>
            <h2 className={styles.pageTitle}>Orders</h2>
            <div className={'d-flex justify-start align-center ' + styles.filterOrdersContainer}>
                {/* <div> */}
                    <Input type="search" placeholder="Search orders" />
                {/* </div> */}
                <select>
                    <option disabled selected>Status</option>
                    <option>Processing</option>
                    <option>Processed</option>
                    <option>Rejected</option>
                    <option>All</option>
                </select>
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.tabs}>
                    <span>All</span>
                    <span>To be delivered</span>
                    <span>Pickups</span>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TH>ID</TH>
                            <TH>Created</TH>
                            <TH>Customer</TH>
                            <TH>Item</TH>
                            <TH>Delivery Status</TH>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TD>1</TD>
                            <TD>15 Jul 2020</TD>
                            <TD>Michael Opah</TD>
                            <TD>Chicken Paella Rice</TD>
                            <TD>Processing</TD>
                        </TableRow>
                        <TableRow>
                            <TD>2</TD>
                            <TD>18 Jul 2020</TD>
                            <TD>John Papa</TD>
                            <TD>Plantain Fritata + fries</TD>
                            <TD>Processing</TD>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        <Sidenav />
        </div>
    )
}

export default Orders
