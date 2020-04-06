import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllCourses } from '../../../actions/courses'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Preloader from '../../dumb/Preloader'
import CourseItem from './CourseItem'

const Courses = ({ getAllCourses, bootcampState, courseState: { courses, loading } }) => {

    useEffect(() => {
        getAllCourses()
        // eslint-disable-next-line
    },[])

    if(loading || !courses){
        return <Preloader />
    }

    return (
        <Fragment>
            <div className="container">
            <p className="flow-text center">Courses</p>
                <div className="row">
                    <Fragment>
                        { courses && courses.map(course => (
                            <CourseItem course={course} key={course._id} />
                        )) }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

Courses.propTypes = {
    getAllCourses: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    courseState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    courseState: state.CourseState
})

export default connect(mapStateToProps, { getAllCourses })(Courses)
