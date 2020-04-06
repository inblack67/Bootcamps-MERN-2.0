import { GET_COURSES, GET_COURSE, COURSE_ERROR, DELETE_COURSE, ADD_COURSE, UPDATE_COURSE } from '../actions/types'
import M from 'materialize-css/dist/js/materialize.min.js';

const initialState = {
    courses: null,
    course: null,
    loading: true
}

export default (state=initialState, action) => {

    const { payload, type } = action

    switch(type){
        case GET_COURSES:
            return {
                ...state,
                courses: payload,
                loading: false
            }
   
        case GET_COURSE:
            return {
                ...state,
                course: payload,
                loading: false
            }

        case ADD_COURSE: 
        return {
            ...state,
            courses: [...state.courses, payload],
            loading: false
        }

        
        case DELETE_COURSE: 
            return {
                ...state,
                course: null,
                courses: state.courses.filter(c => c._id !== payload),
                loading: false
            }

        case UPDATE_COURSE:
            return {
                ...state,
                course: payload.course,
                courses: state.courses.map(b => b._id === payload.id ? payload.course : b),
                loading: false
            }

        case COURSE_ERROR:
            M.toast({ html: payload })
            return {
                ...state,
                courses: null,
                course: null,
                loading: false
            }

        default: return state
    }

}