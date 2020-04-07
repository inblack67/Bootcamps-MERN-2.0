import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getSingleCourse } from '../../../actions/courses'
import { connect } from 'react-redux'
import Preloader from '../../dumb/Preloader'
import CourseItem from './CourseItem'


const SingleCourse = ({ match, getSingleCourse, courseState: { loading, course } }) => {

    useEffect(() => {
        getSingleCourse(match.params.id)
        // eslint-disable-next-line
    },[])


    if(loading || !course){
        return <Preloader />
    }

    return (
        <div className="container">
            <CourseItem course={course} />
        </div>
    )
}

SingleCourse.propTypes = {
    getSingleCourse: PropTypes.func.isRequired,
    courseState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    courseState: state.CourseState
})

export default connect(mapStateToProps, { getSingleCourse })(SingleCourse)
