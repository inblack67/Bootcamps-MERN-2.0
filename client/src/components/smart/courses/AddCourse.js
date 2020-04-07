import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoInitBot from '../AutoInitBot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCourse } from '../../../actions/courses'
import M from 'materialize-css/dist/js/materialize.min.js';

const AddCourse = ({ addCourse, history, courseState: { loading }, bootcampState: { bootcamp } }) => {

    const [formData, setFormData] = useState({
        title: '',
        weeks: '',
        tuition: 0,
        minimumSkill: '',
        description: '',
        scholarShipAvailable: false
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
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
        
        addCourse(formData, bootcamp._id)

        setFormData({
            title: '',
            weeks: '',
            tuition: 0,
            minimumSkill: '',
            description: '',
            scholarShipAvailable: false
        })

        if(!loading){
            history.push(`/bootcamps/${bootcamp._id}/courses`)
        }
    }

    const { title, weeks, tuition, minimumSkill, description, scholarShipAvailable } = formData

    return (
        <Fragment>
        <AutoInitBot />
        <div className="container">
            <h3 className="flow-text center">{bootcamp.name}</h3>
            <p className="flow-text center">Add Course</p>

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
                        <input type="checkbox" name='scholarShipAvailable' value={!scholarShipAvailable} onChange={onChange}/>
                        <span>Scholarship Available</span>
                    </label>
                </p>

                <div className="input-field">
                    <textarea name='description' value={description} onChange={onChange} type="text" className='validate materialize-textarea' required />
                    <span className="helper-text" data-error='Required'>Description</span>
                </div>
            <input type="submit" value="Add Course" className='btn green pulse'/>
            <br/><br/>
            </form>

        </div>
        </Fragment>
    )
}

AddCourse.propTypes = {
    addCourse: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    courseState: state.CourseState
})

export default connect(mapStateToProps, { addCourse })(withRouter(AddCourse))
