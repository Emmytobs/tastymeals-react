import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Sidenav from '../Reusables/Sidenav'
import { Table, TableHead, TableBody, TableRow, TD, TH } from '../Reusables/Table'

import { Input } from '../../../Utilities/Form'

import styles from './Orders.module.css'
import axios from 'axios'
import Overlay from '../../../Utilities/Overlay';
import { OutlineButton, PrimaryButton, SecondaryButton } from '../../../Utilities/Buttons';
import dayjs from 'dayjs';
import { Option, Select } from '../../../Utilities/Form/Form';


function Orders(props) {
    const [searchValue, setSearchValue] = useState('');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderShownInModal, setOrderShownInModal] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/admin`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            if (response.status === 200 && response.data.data) {
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

    const updateOrderStatus = async (updatedOrder) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/order/${updatedOrder.orderid}`,
                { status: updatedOrder.status },
                { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
            )
            if (response.status === 200) {
                const { status } = response.data.data[0];
                const updatedOrders = orders.map(order => {
                    if (order.orderid === updatedOrder.orderid) {
                        return {...order, status}
                    }
                    return order
                });
                console.log(updatedOrders)
                setOrders(updatedOrders)
                setFilteredOrders(updatedOrders)
                setOrderShownInModal(false)
            }
        } catch (error) {
            console.log(error.response)
            if (!error.response) {
                console.log('No Internet')
            }
        }
    }

    return (
        <div className={styles.ordersContainer}>
            <h2 className={styles.pageTitle}>Orders</h2>
            <p>by {props.restaurantProfile.name}</p>
            <div className={'d-flex justify-start align-center ' + styles.filterOrdersContainer}>
                <Input 
                    type="search" 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())}
                    placeholder="Search orders" />
                <div>
                    <span>Filter by:</span>
                    <Select>
                        <Option>Name</Option>
                        <Option>Status</Option>
                        <Option>Delivery type</Option>
                        <Option>Rejected</Option>
                        <Option>All</Option>
                    </Select>
                </div>
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
                            <TH>Item</TH>
                            <TH>Quantity</TH>
                            <TH>Status</TH>
                            <TH>Name</TH>
                            <TH>Phone</TH>
                            <TH>Address</TH>
                            <TH>Type</TH>
                            <TH>Order Note</TH>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredOrders.map((order, index) => (
                                <TableRow key={index} onClick={() => viewOrder(order)}>
                                    <TD>{order.orderid}</TD>
                                    <TD>
                                        {
                                            dayjs(order.createdat).format('D MMM YY, H:m')
                                        }
                                    </TD>
                                    <TD>{order.mealname}</TD>
                                    <TD>{order.quantity}</TD>
                                    <TD>{order.status}</TD>
                                    <TD>{order.firstname} {order.lastname}</TD>
                                    <TD>{order.phone}</TD>
                                    <TD>
                                        <p>{order.delivery_address}</p>
                                        <p>{order.delivery_city}</p>
                                    </TD>
                                    <TD>{order.delivery_type}</TD>
                                    <TD>{order.order_note}</TD>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        <Sidenav />
        {orderShownInModal &&
         <OrderModal 
            updateOrderStatus={updateOrderStatus} 
            order={orderShownInModal} 
            accessToken={props.accessToken} 
            setOrderShownInModal={setOrderShownInModal}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting} />}
        </div>
    )
}

const mapStateToProps = (state) => ({ accessToken: state.accessToken, restaurantProfile: state.adminRestaurantProfile });

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
        if (orderStatus === 'REJECTED' && !rejectionConfirmation) {
            return console.log('Confirm action')
        }
        props.setIsSubmitting(true);
        props.updateOrderStatus({ ...order, status: orderStatus })
    }

    const submittingStyles = {
        opacity: props.isSubmitting ? 0.7 : 1
    }

    useEffect(() => {
        return () => {
            props.setIsSubmitting(false)
        }
    }, [])

    return (
        <Overlay 
            closeOverlayHandler={props.setOrderShownInModal} 
            closeOverlayHandlerArg={null}
            targetId="closeModalTarget"
        >
            <div style={submittingStyles} className={'container '+ styles.orderModalContainer}>
                <div className={styles.orderDetails}>
                    <p>ID: {order.orderid}</p>
                    <p>Name: {order.mealname}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Customer's phone: {order.phone}</p>
                    <p>Current status: {order.status}</p>
                    <p>{order.order_note}</p>
                    <Select name="order_status" onChange={changeStatus} value={orderStatus}>
                        <Option value="PROCESSING">Processing</Option>
                        <Option value="PROCESSED">Processed</Option>
                        <Option value="DELIVERED">Delivered</Option>
                        <Option value="REJECTED">Rejected</Option>
                    </Select>
                    {orderStatus === 'REJECTED' && 
                        <div onClick={() => setRejectionConfirmation(true)}>
                            {
                                rejectionConfirmation ?
                                <p className={styles.rejectionConfirmed}>Confimed. You may click save</p>
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