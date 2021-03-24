import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../../Utilities/Header/Header'
import Footer from '../../../Utilities/Footer'

import styles from './Profile.module.css'
import { Input } from '../../../Utilities/Form'
import { PrimaryButton, SecondaryButton } from '../../../Utilities'
import axios from 'axios'

function Profile(props) {
    const [updatedUserData, setUpdatedUserData] = useState({ })
    const [userData, setUserData] = useState({
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        phone: props.phone,
        password: '',
    })
    const [updateMessage, setUpdateMessage] = useState('')


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    }

    const updateUserData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/user`,
                updatedUserData,
                { headers: { 'Authorization': 'Bearer '+ props.accessToken } }
            )
            if (response.status === 200) {
                return setUpdateMessage(response.data.message);
            }
        } catch (error) {
            if(!error.response) {
                return console.log('No internet')
            }
            setUpdateMessage(error.response.data.message)
        }
    }

    return (
        <>
        <Header />
        <div className={styles.profileContainer}>
            <h3>Your Profile</h3>
            <div className={'container '+ styles.profileForm}>
                <form onSubmit={updateUserData} noValidate>
                    <Input 
                        type="text"
                        name="firstname"
                        placeholder="Enter your firstname"
                        value={userData.firstname}
                        onChange={handleChange}
                    />    
                    <Input 
                        type="text"
                        name="lastname"
                        placeholder="Enter your lastname"
                        value={userData.lastname}
                        onChange={handleChange}
                    />    
                    <Input 
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={userData.email}
                        onChange={handleChange}
                    />    
                    <Input 
                        type="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={userData.phone}
                        onChange={handleChange}
                    />    
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={userData.password}
                        onChange={handleChange}
                    />    
                    {updateMessage && <p className={styles.updateMessage}>{updateMessage}</p>}
                    <div className={styles.buttons}>
                        <PrimaryButton type="submit">Save</PrimaryButton>
                        <SecondaryButton type="button">Cancel</SecondaryButton>
                    </div>
                </form>        
            </div>            
        </div>
        <Footer />
        </>
    )
}

const mapStateToProps = (state) => ({
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    phone: state.user.phone,
    accessToken: state.accessToken
})

export default connect(mapStateToProps, null)(Profile)
