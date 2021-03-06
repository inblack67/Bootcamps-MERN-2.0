import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { deleteReview } from '../../../actions/reviews'

const ReviewsByBootcampItem = ({ deleteReview, reviewState: { reviews }, review: { title, text, rating, bootcamp, user, createdAt, _id }, authState }) => {

    const onDelete = e => {
        deleteReview(_id)
    }

    return (
        <Fragment>
            <div className="card hoverable">
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">more_vert</i></span>
                <p className='grey-text'>
                    Rating: <span className="red-text">{ rating }</span>
                    <br/>
                    Posted At: { <Moment format='YYYY-MM-DD'>{createdAt}</Moment> }
                    <br/>
                </p>
                <br/>
                <p>

                    <Link to={`/reviews/${_id}`}>Explore</Link>
                    <br/>


                    { authState.isAuthenticated &&  
                    ( authState.user.role === 'admin' || ( authState.user._id === user ) ) && <Fragment>
                    <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                    <br/>
                    </Fragment> }
                </p>
                 
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
            <p>{text}</p>
            <br/>
            </div>
            </div>
        </Fragment>
    )
}

ReviewsByBootcampItem.propTypes = {
    review: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState,
    reviewState: state.ReviewState
})

export default connect(mapStateToProps, { deleteReview })(ReviewsByBootcampItem)
