import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/auth'
import { Redirect } from 'react-router-dom'

import M from 'materialize-css/dist/js/materialize.min.js';

const Register = ({ registerUser, authState: { isAuthenticated } }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role: 'user'
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        
        e.preventDefault()

        if(password !== password2){
            M.toast({ html: 'Passwords Must Match' })
            return;
        }

        const newUser = { name, email, password, role }

        registerUser(newUser)

        setFormData({
            name: '',
            email: '',
            password: '',
            password2: '',
            role: 'user'
        })

    }

    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }

    const { name, email, password, password2, role } = formData

    return (

        <div className="container">
            <p className="flow-text center">Register</p>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input type="text" name='name' className='validate' required value={name} onChange={onChange}/>
                    <span className="helper-text" data-error='Required'>Name</span>
                </div>
                <div className="input-field">
                    <input type="email" name='email' className='validate' required value={email} onChange={onChange}/>
                    <span className="helper-text" data-error='Required'>Email</span>
                </div>
                <div className="input-field">
                    <input type="password" name='password' className='validate' required minLength='6' value={password} onChange={onChange}/>
                    <span className="helper-text" data-error='Required'>Password</span>
                </div>
                <div className="input-field">
                    <input type="password" name='password2' className='validate' required minLength='6' value={password2} onChange={onChange}/>
                    <span className="helper-text" data-error='Required'>Confirm Password</span>
                </div>
                <br/>
                <p>
                    <label>
                        <input type="radio" name='role' value='user' checked={ role === 'user' }  onChange={onChange}/>
                        <span>Regular User</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="radio" name='role' value='publisher' checked={ role === 'publisher'}  onChange={onChange} />
                        <span>Bootcamp Publisher</span>
                    </label>
                </p>
                <br/>
                <div className="input-field">
                    <input type="submit" value="Register" className='btn green'/>
                </div>
                <br/>
            </form>
        </div>
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState
})

export default connect(mapStateToProps, { registerUser })(Register)
