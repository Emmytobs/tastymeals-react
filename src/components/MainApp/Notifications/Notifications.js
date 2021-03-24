import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

import Header from '../../../Utilities/Header/Header'
import Footer from '../../../Utilities/Footer'

import styles from './Notifications.module.css'
import axios from 'axios'

function Notifications(props) {
    const [notificationData, setNotificationData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchNotifications = async () => {
        setIsSubmitting(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/notification`, {
                headers: { 'Authorization': 'Bearer '+ props.accessToken }
            });
            if (response.status === 200 && response.data.data) {
                setNotificationData(response.data.data)
                setIsSubmitting(false)
            }
        } catch (error) {
            setIsSubmitting(false)
            if (!error.response) {
                console.log('No internet')
            }
            console.log((error))
        }
    }

    const getFormattedNotificationDate = (date) => {
        const todayDate = dayjs(Date.now())
        const createdAtDate = dayjs(date)
        
        let formattedDate = ''

        let dateDiffByDays = todayDate.date() - createdAtDate.date();
        let dateDiffByHours = todayDate.hour() - createdAtDate.hour();
        let dateDiffByMinutes = todayDate.minute() - createdAtDate.minute();
        
        if (dateDiffByHours < 1 && dateDiffByMinutes < 59) {
            const minuteDiff = todayDate.diff(createdAtDate, 'minute');
            formattedDate = minuteDiff + (minuteDiff > 1 ? ' minutes ago' : ' minute ago')
        } else if (dateDiffByDays < 1 && dateDiffByHours < 23) {
            const hourDiff = todayDate.diff(createdAtDate, 'hour'); 
            formattedDate = hourDiff + (hourDiff > 1 ? ' hours ago' : ' hour ago')
        } else {
            const dayDiff = todayDate.diff(createdAtDate, 'day')
            formattedDate = dayDiff + (dayDiff > 1 ? ' days ago' : ' day ago')
        }
        return formattedDate
    }

    useEffect(() => {
        fetchNotifications()
        
    }, [])

    return (
        <>
          <Header {...props} />  
          <div style={{ opacity: isSubmitting ? 0.7 : 1 }} className={styles.notificationsContainer}>
            <div className={'container '+ styles.notificationsList}>
                <h3>Your order notifications</h3>
                {
                    notificationData.map((notification, index) => (
                        <div 
                            className={'container '+ styles.notificationBox} 
                            style={{ backgroundColor: notification.notification_viewed && 'rgba(0,0,255,0.1)' }}>
                            <img src={notification.mealimage} alt="The meal you ordered" className={'dp-size'} />
                            <p className={styles.notificationMessage}>{notification.notification_message}</p>
                            <small className={styles.notificationDate}>{getFormattedNotificationDate(notification.notification_created_at)}</small>
                        </div>
                    ))
                }
            </div>
          </div>
          <Footer />  
        </>
    )
}

const mapStateToProps = (state) => ({
    accessToken: state.accessToken
})

export const component =  connect(mapStateToProps, null)(Notifications)
