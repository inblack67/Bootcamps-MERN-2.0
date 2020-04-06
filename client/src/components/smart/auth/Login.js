import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../../actions/auth'
import { Redirect, Link } from 'react-router-dom'

const Login = ({ authState: { isAuthenticated }, login }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        
        e.preventDefault()

        login(formData)

        setFormData({
            email: '',
            password: ''
        })
    }

    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }

    const { email, password } = formData

    return (

        <div className="container" style={{'marginBottom': '10rem'}}>
            <p className="flow-text center">Login</p>
            <form onSubmit={onSubmit}>

                <div className="input-field">
                    <input type="email" name='email' className='validate' required value={email} onChange={onChange}/>
                    <span className="helper-text" data-error='Required'>Email</span>
                </div>
                <div className="input-field">
                    <input type="password" name='password' className='validate' required minLength='6' value={password} onChange={onChange}/>
                    <span className="helper-text" data-error='Required'>Password</span>
                </div>
                <br/>
                <br/>
                <div className="input-field">
                    <input type="submit" value="Login" className='btn black darken-2'/>
                    {/* <Link to='/forgot-password' className='btn red secondary-content'>Forgot Password</Link> */}
                </div>
                <br/>
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState
})

export default connect(mapStateToProps, { login })(Login)
