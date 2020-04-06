import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllUsers } from '../../../actions/users'
import Preloader from '../../dumb/Preloader'
import UserItem from './UserItem'
import { Link } from 'react-router-dom'

const Users = ({ getAllUsers, userState: { users, loading, count } }) => {

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line
    },[])

    if(loading || !users){
        return < Preloader/>
    }

    if(users.length === 0){
        return <div className='container'>
            <h3>No Users Yet.</h3>
            <br/>
            <Link to='/add-user' className='btn black pulse'>Add User</Link>
            <br/><br/>
        </div>
    }

    return (
        <Fragment>
            <p className="flow-text center">Registered Users</p>
            <div className="fixed-action-btn">
            <Link to='add-user' className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
            </div>
            { users && users.map(user => (
                <UserItem user={user} key={user._id}/>
            )) }
        </Fragment>
    )
}

Users.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    userState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    userState: state.UserState
})

export default connect(mapStateToProps, { getAllUsers })(Users)
