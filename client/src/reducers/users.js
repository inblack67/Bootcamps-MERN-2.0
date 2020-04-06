import { GET_USERS, USERS_ERROR, GET_USER, USER_ERROR, DELETE_USER, UPDATE_USER, UPDATE_ERROR, ADD_USER } from '../actions/types'

const initialState = {
    users: null,
    count: 0,
    user: null,
    loading: true
}

export default (state=initialState, action) => {

    const { payload, type } = action

    switch(type){

        case GET_USERS:
            return {
                ...state,
                users: payload.data.filter(user => user.role !== 'admin'),
                count: payload.count,
                loading: false
            }

        case GET_USER:
        case ADD_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }

        case UPDATE_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }

        case USERS_ERROR:
            return {
                ...state,
                users: null,
                loading: false
            }

        case USER_ERROR:
        case DELETE_USER:
        case UPDATE_ERROR:
            return {
                ...state,
                user: null,
                loading: false
            }

        default: return state
    }

}