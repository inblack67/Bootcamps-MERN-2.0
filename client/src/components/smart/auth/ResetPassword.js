import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {  } from '../../../actions/auth'
import Preloader from '../../dumb/Preloader'
import { Redirect } from 'react-router-dom'
import { resetPassword } from '../../../actions/auth'

const ResetPassword = ({ authState: { loading, resetToken }, resetPassword }) => {

    const [formData, setFormData] = useState({
        password: '',
        password2: ''
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        const newPassword = { password }
        resetPassword(newPassword, resetToken)
        setFormData({
            password: '',
            password2: ''
        })
    }

    if(loading){
        return <Preloader />
    }

    const { password, password2 } = formData

    return (
        <div className="container">
            <p className="flow-text">Reset Password</p>
            <form onSubmit={onSubmit}>
            <div className="input-field">
                <input type="password" name="password" className='validate' onChange={onChange} value={password} required/>
                <span className="helper-text">New Password</span>
            </div>
            <div className="input-field">
                <input type="password" name="password2" className='validate' onChange={onChange} value={password2} required/>
                <span className="helper-text">Confirm New Password</span>
            </div>
            <br/>
            <div className="input-field">
                <input type="submit" value="Reset" className='btn blue'/>
            </div>
            </form>
            <br/>
        </div>
    )
}

ResetPassword.propTypes = {
    authState: PropTypes.object.isRequired,
    resetPassword: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState
})

export default connect(mapStateToProps, { resetPassword })(ResetPassword)
