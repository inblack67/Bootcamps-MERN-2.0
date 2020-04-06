import React, { useEffect,Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCoursesByBootcamp } from '../../../actions/courses'
import { getSingleBootcamp } from '../../../actions/bootcamps'
import Preloader from '../../dumb/Preloader'
import CoursesByBootcampItem from './CoursesByBootcampItem'

const CoursesByBootcamp = ({ match, getSingleBootcamp, getCoursesByBootcamp, bootcampState,bootcampState: { bootcamp }, courseState: { courses, loading }}) => {

    useEffect(() => {
        getSingleBootcamp(match.params.id)
        getCoursesByBootcamp(match.params.id)
        // eslint-disable-next-line
    },[])

    if(loading){
        return <Preloader />
    }

    if( courses && courses.length === 0 && !loading){
        return <Fragment>
            <div className="container">
                <p className="flow-text center">No course has been published yet.</p>
            </div>
        </Fragment>
    }

    return (
        <Fragment>
            <div className="container">
                <br/>
            <h4 className='center'>{bootcamp && bootcamp.name}</h4>
            <p className="flow-text center">Courses Offered</p>
                <div className="row">
                    <Fragment>
                        { courses && courses.map(course => (
                            <CoursesByBootcampItem course={course} key={course._id} />
                        )) }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

CoursesByBootcamp.propTypes = {
    getCoursesByBootcamp: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    courseState: PropTypes.object.isRequired,
    getSingleBootcamp: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    courseState: state.CourseState
})

export default connect(mapStateToProps, { getCoursesByBootcamp, getSingleBootcamp })(CoursesByBootcamp)
