import React, { useState } from 'react'
import { connect } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../../../Utilities';
import Footer from '../../../Utilities/Footer';
import { Input, Option, Select } from '../../../Utilities/Form/Form';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import styles from './Checkout.module.css';
import { removeOrder } from '../../../redux/dispatchers';

function Checkout(props) {
    const [orderDetails, setOrderDetails] = useState({
        qty: props.order.orderQuantity,
        note: props.order.orderNote,
        price: props.order.price
    })

    const config = {
        public_key: 'FLWPUBK-1aac6da4f16f4969ef4643eec443dcb1-X',
        tx_ref: Date.now(),
        amount: props.order.price * orderDetails.qty,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
          email: props.user.email,
          phonenumber: props.user.phone,
          name: `${props.user.firstname} ${props.user.lastname}`,
        },
        customizations: {
          title: 'Pay for your meal',
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
        removeOrder(null, props.dispatch)
        props.history.push(`/app/meal/${props.order.mealId}`)
    }

    return (
        <>
        <div className={styles.checkoutContainer}>
            <h3 className={styles.pageTitle}>Complete your order</h3>
            <div className={'container '+ styles.orderBox}>
                <div className={styles.orderDetails}>
                    <h4>{props.order.mealname}</h4>
                    <p>from {props.order.name}</p>
                    <div className={styles.quantity}>
                        <span>Quantity: </span>
                        <Select name="qty" onChange={handleOrderChange} value={orderDetails.qty}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </div>
                    <p>Price: {props.order.price * orderDetails.qty}</p>
                    <Input name="note" value={orderDetails.note} onChange={handleOrderChange} />
                    <PrimaryButton 
                        onClick={() => {
                            handleFlutterPayment({
                                callback: (response) => {
                                    console.log(response);
                                    closePaymentModal() // this will close the modal programmatically
                                },
                                onClose: () => {
                                    // Try to make a request to create the order here
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
