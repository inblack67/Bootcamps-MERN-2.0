import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllCourses } from '../../../actions/courses'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const ManageCourses = ({ getAllCourses, bootcampState, courseState }) => {

    useEffect(() => {
        // getAllCourses()
        // eslint-disable-next-line
    },[])

    return (
        <Fragment>
            <div className="container">

            </div>
        </Fragment>
    )
}

ManageCourses.propTypes = {
    getAllCourses: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    courseState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    courseState: state.CourseState
})

export default connect(mapStateToProps, { getAllCourses })(ManageCourses)
