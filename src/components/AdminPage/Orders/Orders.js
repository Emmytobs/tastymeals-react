import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Sidenav from '../Reusables/Sidenav'
import { Table, TableHead, TableBody, TableRow, TD, TH } from '../Reusables/Table'

import { Input } from '../../../Utilities/Form'

import styles from './Orders.module.css'
import axios from 'axios'
import Overlay from '../../../Utilities/Overlay';
import { OutlineButton, PrimaryButton, SecondaryButton } from '../../../Utilities/Buttons';


function Orders(props) {
    const [searchValue, setSearchValue] = useState('');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderShownInModal, setOrderShownInModal] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/admin`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            if (response.status === 200) {
                const ordersData = response.data.data;
                setFilteredOrders(ordersData)
                return setOrders(ordersData)
            }
        } catch (error) {
            if (!error.response) {
                console.log('No internet')
            }
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        if (searchValue.length) {
            const ordersFiltered = orders.filter(order => order.mealname.toLocaleLowerCase().indexOf(searchValue) !== -1 )
            return setFilteredOrders(ordersFiltered)
        }
        setFilteredOrders(orders);
    }, [searchValue])

    const viewOrder = (order) => {
        setOrderShownInModal(order)
    }

    return (
        <div className={styles.ordersContainer}>
            <h2 className={styles.pageTitle}>Orders</h2>
            <div className={'d-flex justify-start align-center ' + styles.filterOrdersContainer}>
                <Input 
                    type="search" 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())}
                    placeholder="Search orders" />
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
                            <TH>Date</TH>
                            <TH>Customer's name</TH>
                            <TH>Customer's phone</TH>
                            <TH>Item ordered</TH>
                            <TH>Item quantity</TH>
                            <TH>Delivery Status</TH>
                            <TH>Order Note</TH>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredOrders.map((order, index) => (
                                <TableRow key={index} onClick={() => viewOrder(order)}>
                                    <TD>{order.orderid}</TD>
                                    <TD>{order.createdat}</TD>
                                    <TD>{order.firstname} {order.lastname}</TD>
                                    <TD>{order.phone}</TD>
                                    <TD>{order.mealname}</TD>
                                    <TD>{order.quantity}</TD>
                                    <TD>{order.status}</TD>
                                    <TD>{order.order_note}</TD>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        <Sidenav />
        {orderShownInModal && <OrderModal order={orderShownInModal} accessToken={props.accessToken} setOrderShownInModal={setOrderShownInModal} />}
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken });

export default connect(mapStateToProps, null)(Orders)


function OrderModal(props) {
    const order = props.order && props.order;
    const [orderStatus, setOrderStatus] = useState('PROCESSING')
    const [rejectionConfirmation, setRejectionConfirmation] = useState(false)

    const changeStatus = (e) => {
        setOrderStatus(e.target.value)
    }
    const saveStatus = async  _ => {
        // Create this endpoint
        // try {
        //     const response = await axios.put(
        //         `${process.env.REACT_APP_API_URL}/order`,
        //         { status: orderStatus },
        //         { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
        //     )
        //     console.log(response)
        // } catch (error) {
        //     if (!error.response) {
        //         console.log('No Internet')
        //     }
        //     console.log(error)
        // }
    }

    return (
        <Overlay 
            closeOverlayHandler={props.setOrderShownInModal} 
            closeOverlayHandlerArg={null}
            targetId="closeModalTarget"
        >
            <div className={'container '+ styles.orderModalContainer}>
                <div className={styles.orderDetails}>
                    <p>ID: {order.orderid}</p>
                    <p>Name: {order.mealname}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Customer's phone: {order.phone}</p>
                    <p>Current status: {order.status}</p>
                    <p>{order.order_note}</p>
                    <select name="order_status" onChange={changeStatus} value={orderStatus}>
                        <option disabled selected>Processing</option>
                        <option value="PROCESSING">Processed</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                    {orderStatus === 'REJECTED' && 
                        <div onClick={() => setRejectionConfirmation(true)}>
                            {
                                rejectionConfirmation ?
                                <p className={styles.rejectionConfirmed}>Rejection Confimed</p>
                                :
                                <p className={styles.rejectionNotConfirmed}>Click to confirm order rejection</p>
                            }
                        </div>
                    }
                </div>
                <div className={'d-flex justify-around align-center '+ styles.save_cancel}>
                    <PrimaryButton 
                        onClick={saveStatus} 
                        style={{ cursor: (orderStatus === 'REJECTED' && !rejectionConfirmation) && 'not-allowed' }}
                    >
                            Save
                    </PrimaryButton>
                    <OutlineButton id="closeModalTarget">Cancel</OutlineButton>
                </div>
            </div>
        </Overlay>
    )
}