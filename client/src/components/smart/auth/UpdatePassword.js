import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updatePassword } from '../../../actions/auth'
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdatePassword = ({ updatePassword }) => {

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(newPassword !== confirmNewPassword){
            M.toast({ html: 'Passwords Must Match' })
            return;
        }
        const newData = { currentPassword, newPassword }
        updatePassword(newData)

        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        })
    }

    const { currentPassword, newPassword, confirmNewPassword } = formData

    return (
        <div className="container">
            <p className="flow-text center">Change Password</p>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input type="password" name='currentPassword' className='validate' onChange={onChange} value={currentPassword} required/>
                    <span className="helper-text" data-error='Required'>Current Password</span>
                </div>
                <div className="input-field">
                    <input type="password" name='newPassword' className='validate' onChange={onChange} value={newPassword} required minLength='6'/>
                    <span className="helper-text" data-error='Required'>New Password</span>
                </div>
                <div className="input-field">
                    <input type="password" name='confirmNewPassword' className='validate' onChange={onChange} value={confirmNewPassword} required minLength='6'/>
                    <span className="helper-text" data-error='Required'>Confirm New Password</span>
                </div>
                <br/><br/>
                <div className="input-field">
                    <input type="submit" value="Update" className='btn blue'/>
                </div>
            </form>
            <br/>
        </div>
    )
}

UpdatePassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
}

export default connect(null, { updatePassword })(UpdatePassword)
