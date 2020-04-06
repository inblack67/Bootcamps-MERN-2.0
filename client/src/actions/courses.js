import { GET_COURSES, COURSE_ERROR, DELETE_COURSE, GET_COURSE, ADD_COURSE, UPDATE_COURSE } from './types'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';

export const getAllCourses = () => async dispatch => {

    try {

        const res = await axios('/api/v1/courses')

        dispatch({
            type: GET_COURSES,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const getSingleCourse = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/courses/${id}`)
        
        dispatch({
            type: GET_COURSE,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const getCoursesByBootcamp = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/bootcamps/${id}/courses`)

        dispatch({
            type: GET_COURSES,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const addCourse = (formData, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/v1/bootcamps/${id}/courses`, formData, config)

        dispatch({
            type: ADD_COURSE,
            payload: res.data.data
        })

        if(res.data.success){
            M.toast({ html: 'Course Added' })
        }

        dispatch(getCoursesByBootcamp(id))

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.data.error
            })
        }
    }
}


export const updateCourse = (formData, id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.put(`/api/v1/courses/${id}`, formData, config)

        if(res.data.success){
            M.toast({ html: 'Course Updated' })
        }

        dispatch({
            type: UPDATE_COURSE,
            payload: {
                course: res.data.data,
                id
            }
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const deleteCourse = (id, bootcampId)  => async dispatch => {

    if(window.confirm('Are you sure wanna delete this course?')) {

    try {
        const res = await axios.delete(`/api/v1/courses/${id}`)

        if(res.data.success){
            M.toast({ html: 'Course Deleted' })
        }

        dispatch({
            type: DELETE_COURSE,
            payload: id
        })

        // dispatch(getCoursesByBootcamp(bootcampId))

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: COURSE_ERROR,
                payload: err.response.data.error
            })
        }
    }

}
}