import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllReviews } from '../../../actions/reviews'
import { useEffect } from 'react'
import ReviewItem from './ReviewItem'
import Preloader from '../../dumb/Preloader'

const Reviews = ({ getAllReviews, reviewState: { reviews, loading } }) => {

    useEffect(() => {
        getAllReviews()
        // eslint-disable-next-line
    },[])

    if(loading){
        return <Preloader />
    }

    return (
        <div className="container">
            <p className="flow-text center">Reviews</p>
            { reviews && reviews.map(r => ( <ReviewItem review={r} key={r._id} /> )) }
        </div>
    )
}

Reviews.propTypes = {
    getAllReviews: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    reviewState: state.ReviewState
})

export default connect(mapStateToProps, { getAllReviews })(Reviews)
