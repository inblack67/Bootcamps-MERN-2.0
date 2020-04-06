import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import Moment from 'react-moment'
import { Link, withRouter } from 'react-router-dom'
import { deleteReview, getAllReviews } from '../../../actions/reviews'

const ReviewItem = ({ match ,history, deleteReview, reviewState: { loading, reviews }, review: { title, text, rating, bootcamp, user, createdAt, _id }, authState }) => {

    const onDelete = e => {
        deleteReview(_id)
        if(!loading){
            history.push(`/bootcamps/${bootcamp._id}`)
        }
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

                    { match.params.id !== _id && <Fragment>
                        <Link to={`/reviews/${_id}`}>Explore</Link>
                    </Fragment> }
                    
                    
                    { authState.isAuthenticated &&  
                    ( authState.user.role === 'admin' || ( authState.user._id === user ) ) && <Fragment>
                    <br/>
                    <br/>
                    { match.params.id === _id && <Fragment>
                        <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                    <Link to={`/update-review/${_id}`} className='grey-text'>Update</Link>
                    <br/><br/>
                    </Fragment> }
                    </Fragment> }
                    
                    { match.params.id === _id && <Fragment>
                    <Link to={`/bootcamps/${bootcamp._id}`} className='green-text'>Explore Bootcamp</Link>
                    <br/><br/><br/>
                    <p>
                    <i className="material-icons left">devices</i>{ bootcamp.name }
                    </p>
                    </Fragment> }

                </p>
                 
            </div>
            <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
            <p>{text}</p>
            
            { match.params.id === _id && <Fragment>
            <p className='grey-text'>{bootcamp.name}</p>
            <br/>
            <Link to={`/bootcamps/${bootcamp._id}`} className='btn red pulse'>Explore Bootcamp</Link>
            </Fragment> }

            </div>
            </div>
        </Fragment>
    )
}

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired,
    reviewState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState,
    reviewState: state.ReviewState
})

export default connect(mapStateToProps, { deleteReview })(withRouter(ReviewItem))
