import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import AutoInitBot from '../AutoInitBot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCourse, getSingleCourse } from '../../../actions/courses'
import Preloader from '../../dumb/Preloader'
import M from 'materialize-css/dist/js/materialize.min.js';

const UpdateCourse = ({ match, updateCourse, history, courseState: { loading, course } }) => {

    useEffect(() => {
        getSingleCourse(course.bootcamp._id)
        // eslint-disable-next-line
    },[])

    const [formData, setFormData] = useState({
        title: course.title,
        weeks: course.weeks,
        tuition: course.tuition,
        minimumSkill: course.minimumSkill,
        description: course.description,
        scholarShipAvailable: course.scholarShipAvailable
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onCheck  = e => {
        if(e.target.checked){
            setFormData({
                ...formData,
                [e.target.name]: true
            })
        }
        else if(!e.target.checked){
            setFormData({
                ...formData,
                [e.target.name]: false
            })
        }
    }

    const onSelect = e => {
        const options = e.target.options;
        const value = []
        for (const i in options) {
            if(options[i].selected){
                value.unshift(options[i].value)
            }
        }

        setFormData({
            ...formData,
            minimumSkill: value[0]
        })
    }

    const onSubmit = e => {

        e.preventDefault()
        if(minimumSkill === ''){
            M.toast({ html: 'Select Minimum Skill Required' })
            return;
        }
        
        updateCourse(formData, course._id)

        setFormData({
            title: '',
            weeks: '',
            tuition: 0,
            minimumSkill: '',
            description: '',
            scholarShipAvailable: false
        })

        if(!loading){
            history.push(`/courses/${course._id}`)
        }
    }

    if(loading || course === null){
        return <Preloader />
    }

    const { title, weeks, tuition, minimumSkill, description, scholarShipAvailable } = formData

    return (
        <Fragment>
        <AutoInitBot />
        <div className="container">
            <h3 className="flow-text center">{course.bootcamp.name}</h3>
            <p className="flow-text center">Update Course</p>

            <form onSubmit={onSubmit}>

                    <div className="input-field">
                        <input name='title' value={title} onChange={onChange} type="text" required className='validate'/>
                        <span className="helper-text" data-error='Required'>Title</span>
                    </div>

                    <div className="input-field">
                        <input name='weeks' value={weeks} onChange={onChange} type="text" required className='validate'/>
                        <span className="helper-text" data-error='Required'>Duration (In Weeks)</span>
                    </div>

                    <div className="input-field">
                        <input name='tuition' value={tuition} onChange={onChange} type="number"  maxLength='20' className='validate'/>
                        <span className="helper-text">Tuition Fee ($)</span>
                    </div>

                    <br/>
                    <div className="input-field">
                        <select name='minimumSkill' value={minimumSkill} required onChange={onSelect}>
                            <option defaultValue disabled>Skill Standard</option>
                            <option value='beginner'>Beginner</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='advanced'>Advanced</option>
                        </select>
                        <label>Minimum Skill Required</label>
                    </div>
                    <br/>

                <p>
                    <label>
                        <input type="checkbox" name='scholarShipAvailable' checked={ scholarShipAvailable === true } value={scholarShipAvailable} onChange={onCheck}/>
                        <span>Scholarship Available</span>
                    </label>
                </p>

                <div className="input-field">
                    <textarea name='description' value={description} onChange={onChange} type="text" className='validate materialize-textarea' required />
                    <span className="helper-text" data-error='Required'>Description</span>
                </div>
            <input type="submit" value="Update Course" className='btn green'/>
            <br/><br/>
            </form>

        </div>
        </Fragment>
    )
}

UpdateCourse.propTypes = {
    updateCourse: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    courseState: state.CourseState
})

export default connect(mapStateToProps, { updateCourse })(withRouter(UpdateCourse))
