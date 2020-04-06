import { GET_BOOTCAMPS, BOOTCAMP_ERROR, GET_BOOTCAMP, ADD_BOOTCAMP, DELETE_BOOTCAMP, UPDATE_BOOTCAMP, PHOTO_UPLOAD } from './types'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';

export const getAllBootCamps = (filterData=null) => async dispatch => {

    try {

        let res;

        if(!filterData){
             res = await axios('/api/v1/bootcamps')
        }

        else if(filterData){
            
            const { averageCost, averageRating } = filterData
            res = await axios(`/api/v1/bootcamps?averageCost[gte]=${averageCost}&averageRating[gte]=${averageRating}`)
            console.log(res.data);

        }

        dispatch({
            type: GET_BOOTCAMPS,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const getSingleBootcamp = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/bootcamps/${id}`)

        dispatch({
            type: GET_BOOTCAMP,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const addBootcamp = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/v1/bootcamps', formData, config)

        dispatch({
            type: ADD_BOOTCAMP,
            payload: res.data.data
        })

        if(res.data.success){
            M.toast({ html: 'Bootcamp Added' })
        }

        dispatch(getAllBootCamps())

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }
}

export const updateBootcamp = (formData, id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.put(`/api/v1/bootcamps/${id}`, formData, config)

        if(res.data.success){
            M.toast({ html: 'Bootcamp Updated' })
        }

        dispatch({
            type: UPDATE_BOOTCAMP,
            payload: {
                bootcamp: res.data.data,
                id
            }
        })

        dispatch(getAllBootCamps())

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const getBootcampByDistance = (zipcode, distance) => async dispatch => {

    try {
        const res = await axios(`/api/v1/bootcamps/radius/${zipcode}/${distance}`)
        console.log(res.data);

        dispatch({
            type: GET_BOOTCAMPS,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const uploadBootcampPhoto = (formData, id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        const res = await axios.put(`/api/v1/bootcamps/${id}/photo`, formData, config)

        if(res.data.success) {
            M.toast({ html: 'Image Uploaded' })
        }

        dispatch({
            type: PHOTO_UPLOAD,
            payload: res.data.data
        })

        dispatch(getAllBootCamps())
        
    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }

}


export const deleteBootcamp = (id)  => async dispatch => {

    if(window.confirm('Are you sure wanna delete this bootcamp?')) {

    try {
        const res = await axios.delete(`/api/v1/bootcamps/${id}`)

        if(res.data.success){
            M.toast({ html: 'Bootcamp Deleted' })
        }

        dispatch({
            type: DELETE_BOOTCAMP,
            payload: id
        })

        // dispatch(getAllBootCamps())

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: BOOTCAMP_ERROR,
                payload: err.response.data.error
            })
        }
    }

}
}