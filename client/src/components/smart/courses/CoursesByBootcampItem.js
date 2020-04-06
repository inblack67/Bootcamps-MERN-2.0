import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteCourse } from '../../../actions/courses'
import Moment from 'react-moment'

const CoursesByBootcampItem = ({ course, authState, deleteCourse }) => {

    const onDelete = e => {
        deleteCourse(_id)
    }

    const { title, scholarShipAvailable, createdAt, tuition, weeks, minimumSkill, _id } = course

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
                <br/>
                <p>
                    <Link to={`/courses/${_id}`}>Explore</Link>

                    { authState.isAuthenticated &&  
                    ( authState.user.role === 'admin' ) && <Fragment>
                    <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                    <br/><br/>
                    </Fragment> }
                </p>
                <br/>
                 
            </div>
            </div>
        </div>
        </div>
    )
}

CoursesByBootcampItem.propTypes = {
    course: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState
})

export default connect(mapStateToProps, { deleteCourse })(CoursesByBootcampItem)
