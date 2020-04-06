import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import AutoInitBot from '../AutoInitBot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateReview, getSingleReview } from '../../../actions/reviews'
import Preloader from '../../dumb/Preloader'
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateReview = ({ match, updateReview, history, reviewState: { loading, review }, bootcampState: { bootcamp } }) => {

    useEffect(() => {
        getSingleReview(match.params.id)
        // eslint-disable-next-line
    },[])

    const [formData, setFormData] = useState({
        title: review.title,
        text: review.text,
        rating: review.rating,
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {

        e.preventDefault()

        updateReview(formData, review._id)

        setFormData({
            title: '',
            text: '',
            rating: 8
        })

        if(!loading){
            history.push(`/reviews/${review._id}`)
        }
    }

    if(loading || review === null){
        return <Preloader />
    }

    const { title, text, rating } = formData

    return (
        <Fragment>
        <AutoInitBot />
        <div className="container">
            <h3 className="flow-text center">{bootcamp && bootcamp.name}</h3>
            <p className="flow-text center">Update Review</p>

            <form onSubmit={onSubmit}>

                    <div className="input-field">
                        <input name='title' value={title} onChange={onChange} type="text" required className='validate'/>
                        <span className="helper-text" data-error='Required'>Review Title</span>
                    </div>

                    <div className="input-field">
                        <input name='text' value={text} onChange={onChange} type="text" required className='validate'/>
                        <span className="helper-text" data-error='Required'>Review Content</span>
                    </div>

                    <br />

                    <p className="range-field">
                        <input type="range" min="1" max="10" name='rating' value={rating} onChange={onChange} required className='validate'/>
                        <span className="helper-text grey-text">Bootcamp Rating : {rating} </span>
                    </p>

                    <br/><br/>

            <input type="submit" value="Post" className='btn green'/>
            <br/><br/>
            </form>

        </div>
        </Fragment>
    )
}

UpdateReview.propTypes = {
    reviewState: PropTypes.object.isRequired,
    bootcampState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    reviewState: state.ReviewState
})

export default connect(mapStateToProps, { updateReview })(withRouter(UpdateReview))
