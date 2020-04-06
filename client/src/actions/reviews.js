import { GET_REVIEWS, REVIEW_ERROR, GET_REVIEW, ADD_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from './types'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';

export const getAllReviews = () => async dispatch => {

    try {

        const res = await axios('/api/v1/reviews')

        dispatch({
            type: GET_REVIEWS,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: REVIEW_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const getSingleReview = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/reviews/${id}`)
        
        dispatch({
            type: GET_REVIEW,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: REVIEW_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const getReviewsByBootcamp = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/bootcamps/${id}/reviews`)

        dispatch({
            type: GET_REVIEWS,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: REVIEW_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const addReview = (formData, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/v1/bootcamps/${id}/reviews`, formData, config)

        dispatch({
            type: ADD_REVIEW,
            payload: res.data.data
        })

        if(res.data.success){
            M.toast({ html: 'Review Added' })
        }

        dispatch(getReviewsByBootcamp(id))

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: REVIEW_ERROR,
                payload: err.response.data.error
            })
        }
    }
}


export const updateReview = (formData, id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.put(`/api/v1/reviews/${id}`, formData, config)

        if(res.data.success){
            M.toast({ html: 'Review Updated' })
        }

        dispatch({
            type: UPDATE_REVIEW,
            payload: {
                course: res.data.data,
                id
            }
        })

        dispatch(getSingleReview(id))

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: REVIEW_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const deleteReview = (id)  => async dispatch => {

    if(window.confirm('Are you sure wanna delete this review?')) {

    try {
        const res = await axios.delete(`/api/v1/reviews/${id}`)

        if(res.data.success){
            M.toast({ html: 'Review Deleted' })
        }

        dispatch({
            type: DELETE_REVIEW,
            payload: id
        })

        // dispatch(getCoursesByBootcamp(bootcampId))

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: REVIEW_ERROR,
                payload: err.response.data.error
            })
        }
    }

}
}