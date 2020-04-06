import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteCourse } from '../../../actions/courses'
import Moment from 'react-moment'
import UpdateCourse from './UpdateCourse'

const CourseItem = ({ course, authState, deleteCourse, history, match, courseState: { loading } }) => {

    const onDelete = e => {
        deleteCourse(_id, bootcamp)
        if(!loading){
            history.push(`/bootcamps/${bootcamp._id}`)
        }
    }

    const { title, description, bootcamp, createdAt, tuition, weeks, minimumSkill, _id , scholarShipAvailable, user} = course

    return (
        <div>
        <div className="col m6">
            <br/>
            <div className="card hoverable">
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">more_vert</i></span>
                <p className='grey-text'>
                    Launched At: { <Moment format='YYYY-MM-DD'>{createdAt}</Moment> }
                    <br/>
                    Tuition: { tuition }
                    <br/>
                    Weeks: { weeks }
                    <br/>
                    Standard: <span className="red-text">{ minimumSkill.charAt(0).toUpperCase() + minimumSkill.slice(1) }</span>
                    <br/>
                    { scholarShipAvailable && <span className='green-text'>Scholarships Available</span> }
                </p>
                <br/>
                <p>
                    { match.params.id !== _id && <Fragment>
                        <Link to={`/courses/${_id}`}>Explore</Link>
                    </Fragment> }
                    <br/><br/>

                    <Link to={`/bootcamps/${bootcamp._id}`} className='blue-text'>Explore Bootcamp</Link>

                    { authState.isAuthenticated &&  
                    ( authState.user.role === 'admin' || ( authState.user._id === user ) ) && <Fragment>
                    <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                    <br/>
                    <br/>
                    <span>
                    { match.params.id === _id && <Fragment>
                        <Link to={`/update-course/${_id}`} className='green-text'>Update Course</Link>
                    </Fragment> }
                    </span>
                    </Fragment> }
                </p>
                <br/>
                 
                <p>
                    <i className="material-icons left">devices</i>{ bootcamp.name }
                </p>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
            <p>{description}</p>
            <p className='grey-text'>{bootcamp.name}</p>
            <br/>
            <Link to={`/bootcamps/${bootcamp._id}`} className='btn black pulse'>Explore Bootcamp</Link>
            </div>
            </div>
        </div>
        </div>
    )
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
    courseState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState,
    courseState: state.CourseState
})

export default connect(mapStateToProps, { deleteCourse })(withRouter(CourseItem))
