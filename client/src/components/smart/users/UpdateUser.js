import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateUser, getSingleUser } from '../../../actions/users'
import Preloader from '../../dumb/Preloader'
import { withRouter } from 'react-router-dom'

const UpdateUser = ({ history, match, updateUser, getSingleUser, userState: { user, loading } }) => {

    useEffect(() => {
        getSingleUser(match.params.id)
        // eslint-disable-next-line
    },[])

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log();
        updateUser(formData, user._id)

        if(!loading){
            history.push(`/users/${user._id}`)
        }
    }

    if(loading || !user){
        return <Preloader />
    }

    const { name, email, role } = formData

    return (
        <div className="container">
            <p className="flow-text center">Update {name}</p>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input type="text" name='name' className='validate' onChange={onChange} value={name} required/>
                    <span className="helper-text" data-error='Required'>Name</span>
                </div>
                <div className="input-field">
                    <input type="email" name='email' className='validate' onChange={onChange} value={email} required/>
                    <span className="helper-text" data-error='Required'>Email</span>
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

                <div className="input-field">
                    <input type="submit" value="Update" className='btn blue'/>
                </div>

                <br/><br/>
            </form>
            <br/>
        </div>
    )
}

UpdateUser.propTypes = {
    userState: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    getSingleUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userState: state.UserState
})

export default connect(mapStateToProps, { updateUser, getSingleUser })(withRouter(UpdateUser))
