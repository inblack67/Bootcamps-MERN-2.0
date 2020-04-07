import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getSingleReview } from '../../../actions/reviews'
import { connect } from 'react-redux'
import Preloader from '../../dumb/Preloader'
import ReviewItem from './ReviewItem'


const SingleCourse = ({ match, getSingleReview, reviewState: { loading, review } }) => {

    useEffect(() => {
        getSingleReview(match.params.id)
        // eslint-disable-next-line
    },[])


    if(loading || !review){
        return <Preloader />
    }

    return (
        <div className="container">
            <p className="flow-text center">Review</p>
            <ReviewItem review={review} />
        </div>
    )
}

SingleCourse.propTypes = {
    getSingleReview: PropTypes.func.isRequired,
    reviewState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    reviewState: state.ReviewState
})

export default connect(mapStateToProps, { getSingleReview })(SingleCourse)
