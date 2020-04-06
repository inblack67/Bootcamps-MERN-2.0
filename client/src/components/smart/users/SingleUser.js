import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Preloader from '../../dumb/Preloader'
import { getSingleUser, deleteUser } from '../../../actions/users'
import Moment from 'react-moment'
import { Link, Redirect } from 'react-router-dom'

const SingleUser = ({ match, getSingleUser, userState: { user, loading } }) => {

    useEffect(() => {
        getSingleUser(match.params.id)
        // eslint-disable-next-line
    },[])

    if(loading || !user){
        return <Preloader />
    }

    if(!user && !loading){
        return <Redirect to='/users' />
    }

    const { name, email, role, createdAt, _id } = user

    return (
        <div className="container">
            <div className="card">
                 <div className="card-content">
                    <span className="card-title">{name}</span>
                    <br/>
                    <span><i className="material-icons left">email</i>
                    {email}
                    </span>
                    <br/><br/>
                    <span>
                    <i className="material-icons left">account_circle</i>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                    <br/><br/>
                    <span>
                    <i className="material-icons left">group_add</i>
                        <Moment format='YYYY-MM-DD'>
                            {createdAt}
                        </Moment>
                    </span>
                </div>
                <div className="card-action">
                    <Link to={`/users/user/${_id}`} className='right green-text left'>Update</Link>
                    <Link to='/users' className='center'>Back To Users</Link>
                </div>
            </div>
        </div>
    )
}

SingleUser.propTypes = {
    userState: PropTypes.object.isRequired,
    getSingleUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userState: state.UserState
})

export default connect(mapStateToProps, { getSingleUser, deleteUser })(SingleUser)
