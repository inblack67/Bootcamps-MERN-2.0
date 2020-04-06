import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, UPDATE_ACCOUNT, UPDATE_ERROR, UPDATE_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, GET_RESET_TOKEN } from '../actions/types'
import M from 'materialize-css/dist/js/materialize.min.js';
import setAuthCookie from '../setAuthCookie'

const initialState = {
    token: document.cookie.split('=')[1],
    user: null,
    error: null,
    isAuthenticated: false,
    loading: true,
    resetToken: null
}


export default (state=initialState, action) => {

    const { payload, type } = action

    switch(type){

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case RESET_PASSWORD:
            setAuthCookie(state.token)
            return {
                ...state,
                isAuthenticated: true,
                token: document.cookie.split('=')[1],
                loading: false,
            }

        case USER_LOADED:
        case UPDATE_ACCOUNT:
        case UPDATE_PASSWORD:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case FORGOT_PASSWORD: 
            return {
                ...state,
                loading: false
            }

        case GET_RESET_TOKEN: 
            return {
                ...state,
                resetToken: payload,
                loading: false
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            setAuthCookie(null)
            M.toast({ html: payload })

            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: payload
            }

        case UPDATE_ERROR:
            M.toast({ html: payload })
            return {
                ...state,
                error: payload
            }

        default: return state
    }

}