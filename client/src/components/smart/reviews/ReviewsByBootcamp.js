import React, { useEffect,Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getReviewsByBootcamp } from '../../../actions/reviews'
import { getSingleBootcamp } from '../../../actions/bootcamps'
import Preloader from '../../dumb/Preloader'
import ReviewsByBootcampItem from './ReviewsByBootcampItem'
import { Link } from 'react-router-dom'

const ReviewsByBootcamp = ({ authState, match, getSingleBootcamp, getReviewsByBootcamp, bootcampState: { bootcamp }, reviewState: { reviews, loading }}) => {

    useEffect(() => {
        getSingleBootcamp(match.params.id)
        getReviewsByBootcamp(match.params.id)
        // eslint-disable-next-line
    },[])

    if(loading){
        return <Preloader />
    }

    const isEligible = () => {
        if(reviews){
            const res = reviews.filter(r => r.user === authState.user._id)
            if(res.length > 0){
                return false
            }
            else return true
        }
    }

    if( reviews && reviews.length === 0 && !loading){
        return <Fragment>
            <div className="container center">
                <p className="flow-text center">No reviews has been posted yet.</p>
                { authState.isAuthenticated && (authState.user.role === 'user' || authState.user.role === 'admin') && isEligible() && <Fragment>
                    <Link to='/add-review' className='btn red center'>Add Yours</Link>
                    <br/><br/>
                    </Fragment> }   
            </div>
        </Fragment>
    }

    return (
        <Fragment>
            <div className="container">
                <br/>
            <h4 className='center'>{bootcamp && bootcamp.name}</h4>
            <p className="flow-text center">Reviews</p>

            { authState.isAuthenticated && (authState.user.role === 'user' || authState.user.role === 'admin') && isEligible() && <Fragment>
                    <Link to='/add-review' className='btn red center'>Add Yours</Link>
                    <br/><br/>
                    </Fragment> }


                <div className="row">
                    <Fragment>
                        { reviews && reviews.map(review => (
                            <ReviewsByBootcampItem review={review} key={review._id} />
                        )) }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

ReviewsByBootcamp.propTypes = {
    getReviewsByBootcamp: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    reviewState: PropTypes.object.isRequired,
    getSingleBootcamp: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    reviewState: state.ReviewState,
    authState: state.AuthState
})
    
export default connect(mapStateToProps, { getReviewsByBootcamp, getSingleBootcamp })(ReviewsByBootcamp)
