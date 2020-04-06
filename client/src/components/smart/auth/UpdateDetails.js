import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateDetails } from '../../../actions/auth'

const UpdateDetails = ({ authState: { user }, updateDetails }) => {

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        updateDetails(formData)
    }

    const { name, email } = formData

    return (
        <div className="container">
            <p className="flow-text center">Manage Account</p>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input type="text" name='name' className='validate' onChange={onChange} value={name} required/>
                    <span className="helper-text" data-error='Required'>Name</span>
                </div>
                <div className="input-field">
                    <input type="email" name='email' className='validate' onChange={onChange} value={email} required/>
                    <span className="helper-text" data-error='Required'>Email</span>
                </div>
                <br/><br/>
                <div className="input-field">
                    <input type="submit" value="Update" className='btn blue'/>
                    <Link to='/update-password' className='secondary-content red btn'>Change Password</Link>
                </div>
            </form>
            <br/>
        </div>
    )
}

UpdateDetails.propTypes = {
    updateDetails: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState,
})

export default connect(mapStateToProps, { updateDetails })(UpdateDetails)
