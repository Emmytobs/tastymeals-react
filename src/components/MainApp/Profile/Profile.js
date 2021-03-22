import React, { useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../../Utilities/Header/Header'
import Footer from '../../../Utilities/Footer/Footer'

import styles from './Profile.module.css'
import { Input } from '../../../Utilities/Form'

function Profile(props) {
    const [userData, setUserData] = useState({
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        phone: props.phone,
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    return (
        <>
        <Header />
        <div className={styles.profileContainer}>
            <div className={'container'}>
                <form>
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
})

export default connect(mapStateToProps, null)(Profile)
