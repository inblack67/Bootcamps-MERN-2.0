import { GET_USERS, USERS_ERROR, GET_USER, USER_ERROR, DELETE_USER, UPDATE_USER, UPDATE_ERROR, ADD_USER } from './types'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';

export const getAllUsers = () => async dispatch => {

    try {
        const res = await axios('/api/v1/users')

        dispatch({
            type: GET_USERS,
            payload: res.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USERS_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const getSingleUser = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/users/${id}`)

        dispatch({
            type: GET_USER,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USER_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const addUser = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.post('/api/v1/users', formData, config)

        dispatch({
            type: ADD_USER,
            payload: res.data.data
        })

        if(res.data.success){
            M.toast({ html: 'User Added' })
        }

        dispatch(getAllUsers())

    } catch (err) {
        if(err.response !== undefined){
            dispatch({
                type: USER_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const updateUser = (newData, id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/v1/users/user/${id}`, newData, config)

        dispatch({
            type: UPDATE_USER,
            payload: res.data.data
        })

        console.log(res.data);

        if(res.data.success){
            M.toast({ html: 'User Updated' })
        }

        // dispatch(getSingleUser())

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const deleteUser = (id) => async dispatch => {

    if(window.confirm('Are you sure wanna delete this user?')){

    try {
        const res = await axios.delete(`/api/v1/users/${id}`)

        dispatch({
            type: DELETE_USER
        })

        if(res.data.success){
            M.toast({ html: res.data.msg })
        }

        dispatch(getAllUsers())

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USER_ERROR,
                payload: err.response.data.error
            })
        }
    }

}
    
}