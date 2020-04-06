import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, UPDATE_ACCOUNT, UPDATE_ERROR, UPDATE_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, GET_RESET_TOKEN } from './types'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';
import setAuthToken from '../setAuthCookie';

export const registerUser = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/v1/auth/register', formData, config)


        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        })

        if(res.data.success){
            M.toast({
                html: 'Registration Successful'
            })
        }

        dispatch(loadUser(res.data.token))

    } catch (err) {

        if(err.response !== undefined){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.error
            })
        }

    }

}

export const login = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/v1/auth/login', formData, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })

        dispatch(loadUser())

    } catch (err) {


        if(err.response !== undefined){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.error
            })
        }

    }
}

export const updateDetails = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.put('/api/v1/auth/updatedetails', formData, config)

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: res.data.data
        })

        if(res.data.success){
            M.toast({ html: 'Details Updated Successfuly' })
        }

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

export const updatePassword = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.put('/api/v1/auth/updatepassword', formData, config)

        dispatch({
            type: UPDATE_PASSWORD,
            payload: res.data.data
        })

        if(res.data.success){
            M.toast({ html: 'Password Updated Successfuly' })
        }

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

export const forgotPassword = ({email}) => async (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.post('/api/v1/auth/forgotpassword', {email}, config)

        dispatch({
            type: FORGOT_PASSWORD
        })

        if(res.data.success){
            M.toast({ html: res.data.msg })
            dispatch(getResetToken({email}))
        }

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

export const resetPassword = (formData, resetToken) => async (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.put(`/api/v1/auth/resetpassword/${resetToken}`, formData, config)
        
        dispatch({
            type: RESET_PASSWORD,
            payload: res.data.token
        })

        if(res.data.success){
            M.toast({ html: 'Password Changed' })
            dispatch(loadUser())
        }

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
 

export const getResetToken = ({email}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.post('/api/v1/auth/resetToken', { email }, config)

        dispatch({
            type: GET_RESET_TOKEN,
            payload: res.data.resetToken
        })

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

export const logout = () => async (dispatch) => {
    try {
        const res = await axios('/api/v1/auth/logout')

        dispatch({
            type: LOGOUT,
            payload: res.data.msg
        })      
    } catch (err) {
        console.error(err)
    }
}

// GET Logged In User
export const loadUser = () => async (dispatch, getState) => {

    const token = getState().AuthState.token

    setAuthToken(token)

    try {
        const res = await axios('/api/v1/auth/me')
        dispatch({
            type: USER_LOADED,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err);
    }
}
