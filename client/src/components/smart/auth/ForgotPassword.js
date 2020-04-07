import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { forgotPassword, getResetToken } from '../../../actions/auth'
import { Redirect } from 'react-router-dom'

const ForgotPassword = ({ getResetToken, forgotPassword, authState: { loading, resetToken } }) => {

    const [email, setEmail] = useState('')

    const onChange = e => {
        setEmail(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        forgotPassword({email})
        setEmail('')
    }

    if(!loading && resetToken){

        return <Redirect to={`/reset-password/${resetToken}`} />
    }

    return (
        <div className="container">
            <p className="flow-text">Forgot Password</p>
            <form onSubmit={onSubmit}>
            <div className="input-field">
                <input type="email" name="email" className='validate' onChange={onChange} value={email} required/>
                <span className="helper-text">Registered Email</span>
            </div>
            <br/>
            <div className="input-field">
                <input type="submit" value="Get Reset Email" className='btn blue'/>
            </div>
            </form>
            <br/>
        </div>
    )
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
    getResetToken: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState
})

export default connect(mapStateToProps, { forgotPassword, getResetToken })(ForgotPassword)
