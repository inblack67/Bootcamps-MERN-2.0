import { combineReducers } from 'redux'
import bootcamps from './bootcamps'
import auth from './auth'
import users from './users'
import courses from './courses'
import reviews from './reviews'

export default combineReducers({
    BootcampState: bootcamps,
    AuthState: auth,
    UserState: users,
    CourseState: courses,
    ReviewState: reviews
});