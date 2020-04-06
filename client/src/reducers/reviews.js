import { GET_REVIEWS, GET_REVIEW, ADD_REVIEW, DELETE_REVIEW, UPDATE_REVIEW, REVIEW_ERROR } from '../actions/types'
import M from 'materialize-css/dist/js/materialize.min.js';

const initialState = {
    reviews: null,
    review: null,
    loading: true
}

export default (state=initialState, action) => {

    const { payload, type } = action

    switch(type){
        case GET_REVIEWS:
            return {
                ...state,
                reviews: payload,
                loading: false
            }
   
        case GET_REVIEW:
            return {
                ...state,
                review: payload,
                loading: false
            }

        case ADD_REVIEW: 
        return {
            ...state,
            reviews: [payload, ...state.reviews],
            loading: false
        }

        
        case DELETE_REVIEW: 
            return {
                ...state,
                review: null,
                reviews: state.reviews.filter(r => r._id !== payload),
                loading: false
            }

        case UPDATE_REVIEW:
            return {
                ...state,
                review: payload.review,
                reviews: state.reviews.map(b => b._id === payload.id ? payload.review : b),
                loading: false
            }

        case REVIEW_ERROR:
            M.toast({ html: payload })
            return {
                ...state,
                reviews: null,
                review: null,
                loading: false
            }

        default: return state
    }

}