import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser } from '../../../actions/users'

const UserItem = ({ deleteUser, user: { name, email, role, createdAt, _id } }) => {

    const onDelete = e => {
        deleteUser(_id);
    }

    return (
        <div>
            <div className="container">
            <div className="card hoverable">
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
                    <Link to={`/users/${_id}`}>Inspect</Link>
                    <a href='#!' onClick={onDelete} className='right red-text'>Delete</a>
                </div>
            </div>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
}

export default connect(null,{ deleteUser })(UserItem)
