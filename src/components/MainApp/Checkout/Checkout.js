import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

import { PrimaryButton, SecondaryButton } from '../../../Utilities';
import Footer from '../../../Utilities/Footer';
import { Input, Option, Select } from '../../../Utilities/Form/Form';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import styles from './Checkout.module.css';
import { removeOrder } from '../../../redux/dispatchers';

function Checkout(props) {
    const [orderDetails, setOrderDetails] = useState({
        mealId: props.order.mealid,
        restaurantId: props.order.restaurantid,
        orderNote: props.order.orderNote,
        deliveryType: 'DELIVERY',
        deliveryAddress: '',
        deliveryCity: '',
        orderQuantity: props.order.orderQuantity,
        cashAmount: ''
    })
    
    const [deliveryFee, setDeliveryFee] = useState((props.order.price * orderDetails.orderQuantity) * 0.05)
    useEffect(() => {
        if (orderDetails.deliveryType === 'Pickup') {
            return setDeliveryFee(0)
        }
        setDeliveryFee((props.order.price * orderDetails.orderQuantity) * 0.05);
    }, [orderDetails])

    const config = {
        public_key: 'FLWPUBK-1aac6da4f16f4969ef4643eec443dcb1-X',
        tx_ref: Date.now(),
        amount: (props.order.price * orderDetails.orderQuantity) + deliveryFee,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
          email: props.user.email,
          phonenumber: props.user.phone,
          name: `${props.user.firstname} ${props.user.lastname}`,
        },
        customizations: {
          title: `Payment for ${props.order.mealname}`,
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value })
    }
    const cancelOrder = () => {
        props.history.push(`/app/meal/${props.order.mealid}`)
        removeOrder(null, props.dispatch)
    }
    const createOrder = async () => {
        const order = {
            ...orderDetails,
            cashAmount: (props.order.price * orderDetails.orderQuantity) + deliveryFee
        };
        console.log(order)
        // try {
        //     const response = await axios.post(
        //         `${process.env.REACT_APP_API_URL}/order`,
        //         order,
        //         { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
        //     );
        //     console.log(response);
        // } catch (error) {
        //     if (!error.response) {
        //         return console.log('No internet')
        //     }
        //     console.log(error)
        // }
    }

    return (
        <>
        <div className={styles.checkoutContainer}>
            <h3 className={styles.pageTitle}>Review &amp; Complete your order</h3>
            <div className={'container d-flex justify-between align-start '+ styles.orderBox}>
                <div className={styles.orderDetails}>
                    <h4>{props.order.mealname}</h4>
                    <p>from {props.order.name}</p>
                    <div className={styles.quantity}>
                        <span>Quantity: </span>
                        <Select name="orderQuantity" onChange={handleOrderChange} value={orderDetails.orderQuantity}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </div>
                    <p>Price: {props.order.price * orderDetails.orderQuantity}</p>
                    <Input name="orderNote" placeholder="Optionally leave a note for the restaurant" value={orderDetails.orderNote} onChange={handleOrderChange} />
                    
                    <p>How will you like to get it</p>
                    <Select name="deliveryType" onChange={handleOrderChange} value={orderDetails.deliveryType}>
                        <Option value='PICKUP'>Pickup</Option>
                        <Option value='DELIVERY'>Delivery</Option>
                    </Select>

                    <p>Put in your delivery location</p>
                    <Input type="text" onChange={handleOrderChange} value={orderDetails.deliveryAddress} name="deliveryAddress" placeholder="Address" />
                    <Input type="text" onChange={handleOrderChange} value={orderDetails.deliveryCity} name="deliveryCity" placeholder="City" />
                </div>
                <div className={styles.orderSummary}>
                    <h4>Order summary:</h4>
                    <p>Item: {props.order.mealname}</p>
                    <p>Price: {props.order.price * orderDetails.orderQuantity}</p>
                    <p>Delivery fee: {deliveryFee}</p>
                    <p>Subtotal: {(props.order.price * orderDetails.orderQuantity) + (deliveryFee)}</p>

                    <PrimaryButton 
                        onClick={() => {
                            handleFlutterPayment({
                                callback: (response) => {
                                    console.log(response);
                                    closePaymentModal() // this will close the modal programmatically
                                },
                                onClose: () => {
                                    // Try to make a request to create the order here
                                    console.log('Executed in onClose');
                                },
                            });
                        }}
                        style={{ marginTop: '30px', width: '100%' }}>Order meal</PrimaryButton>
                    <SecondaryButton 
                        style={{ marginTop: '10px', width: '100%' }}
                        onClick={cancelOrder}>Cancel order</SecondaryButton>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    user: state.user
})

export default connect(mapStateToProps, null)(Checkout)
