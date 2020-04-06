import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoInitBot from '../AutoInitBot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateBootcamp } from '../../../actions/bootcamps'
import Preloader from '../../dumb/Preloader'

const UpdateBootcamp = ({ updateBootcamp, history, bootcampState: { bootcamp,loading } }) => {

    const [formData, setFormData] = useState({
        name: bootcamp.name,
        address: bootcamp.location.formattedAddress,
        phone: bootcamp.phone,
        email: bootcamp.email,
        website: bootcamp.website,
        description: bootcamp.description,
        careers: bootcamp.careers,
        housing: bootcamp.housing,
        jobAssistance: bootcamp.jobAssistance,
        jobGuarantee: bootcamp.jobGuarantee,
        acceptGi: bootcamp.acceptGi
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSelect = e => {
        const options = e.target.options;
        const values = []
        for (const i in options) {
            if(options[i].selected){
                values.unshift(options[i].value)
            }
        }

        setFormData({
            ...formData,
            careers: values
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

    const onSubmit = e => {

        e.preventDefault()

        let newData = formData

        if(name !== bootcamp.name){
            newData = { ...newData, name }
        }

        else{
            newData.name = undefined
        }

        console.log(newData);

        updateBootcamp(newData, bootcamp._id)

        setFormData({
            name: '',
            address: '',
            phone: '',
            email: '',
            website: '',
            description: '',
            careers: [],
            housing: false,
            jobAssistance: false,
            jobGuarantee: false,
            acceptGi: false
        })

        if(!loading){
            history.push('/bootcamps')
        }
    }

    const { name, address, phone, email, website, description, careers, housing, jobAssistance, jobGuarantee,acceptGi } = formData

    return (
        <Fragment>
            <AutoInitBot />
        <div className="container">
            <h3 className="flow-text center">Update Bootcamp</h3>

            <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col s6">
                    <h5>Location And Contact</h5>
                    <span className="red-text">Headquarters Only</span>

                    <div className="input-field">
                        <input name='name' value={name} onChange={onChange} type="text" required maxLength='50' className='validate'/>
                        <span className="helper-text" data-error='Required'>Name</span>
                    </div>

                    <div className="input-field">
                        <input name='address' value={address} onChange={onChange} type="text" required className='validate'/>
                        <span className="helper-text" data-error='Required'>Full Address</span>
                    </div>

                    <div className="input-field">
                        <input name='phone' value={phone} onChange={onChange} type="text"  maxLength='20' className='validate'/>
                        <span className="helper-text">Contact Phone</span>
                    </div>

                    <div className="input-field">
                        <input name='email' value={email} onChange={onChange} type="email"  className='validate'/>
                        <span className="helper-text">Contact Email</span>
                    </div>

                    <div className="input-field">
                        <input name='website' value={website} onChange={onChange} type="url" className='validate'/>
                        <span className="helper-text">Website</span>
                    </div>

                </div>
                <div className="col s6">
                    <h5>Other Specifications</h5>

                    <div className="input-field">
                        <textarea name='description' value={description} onChange={onChange} type="url" className='validate materialize-textarea' required maxLength='500'/>
                        <span className="helper-text" data-error='Required'>Description</span>
                    </div>
                    <br/>
                    <div className="input-field">
                        <select name='careers' multiple value={careers} required onChange={onSelect} multiple>
                            <option defaultValue disabled>Career</option>
                            <option>Web Development</option>
                            <option>Mobile Development</option>
                            <option>UI/UX</option>
                            <option>Data Science</option>
                            <option>Business</option>
                            <option>Other</option>
                        </select>
                        <label>Careers</label>
                    </div>
                    <br/>

                <p>
                    <label>
                        <input type="checkbox" name='housing' value={housing} checked={ housing === true } onChange={onCheck}/>
                        <span>Housing?</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name='jobAssistance' value={jobAssistance} checked={ jobAssistance === true }  onChange={onCheck} />
                        <span>Job Assistance?</span>
                    </label>
                </p>

                <p>
                    <label>
                        <input type="checkbox" name='jobGuarantee' value={jobGuarantee} checked={ jobGuarantee === true }  onChange={onCheck} />
                        <span>Job Gurantee?</span>
                    </label>
                </p>

                <p>
                    <label>
                        <input type="checkbox" name='acceptGi' value={acceptGi} checked={ acceptGi === true }  onChange={onCheck} />
                        <span>Accept GI Bill?</span>
                    </label>
                </p>

                </div>
            </div>
            <input type="submit" value="Update Bootcamp" className='btn green pulse'/>
            <br/><br/>
            </form>

        </div>
        </Fragment>
    )
}

UpdateBootcamp.propTypes = {
    updateBootcamp: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState
})

export default connect(mapStateToProps, { updateBootcamp })(withRouter(UpdateBootcamp))
