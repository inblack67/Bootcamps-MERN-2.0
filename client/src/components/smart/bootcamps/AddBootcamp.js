import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoInitBot from '../AutoInitBot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addBootcamp } from '../../../actions/bootcamps'
import M from 'materialize-css/dist/js/materialize.min.js';

const AddBootcamp = ({ addBootcamp, history, bootcampState: { loading, bootcamps }, authState: { user } }) => {

    const [formData, setFormData] = useState({
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

    const onSubmit = e => {

        e.preventDefault()

        if(careers.length === 0){
            M.toast({ html: 'Select Some Careers' })
            return;
        }

        addBootcamp(formData)

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
            <h3 className="flow-text center">Add Bootcamp</h3>
            <p className="flow-text center">Only One Bootcamp can be added per account</p>

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
                        <textarea name='description' value={description} onChange={onChange} type='text' className='validate materialize-textarea' required maxLength='500'/>
                        <span className="helper-text" data-error='Required'>Description</span>
                    </div>
                    <br/>
                    <div className="input-field">
                        <select name='careers' multiple value={careers} required onChange={onSelect}>
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
                        <input type="checkbox" name='housing' value={!housing} onChange={onChange}/>
                        <span>Housing?</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name='jobAssistance' value={!jobAssistance}  onChange={onChange} />
                        <span>Job Assistance?</span>
                    </label>
                </p>

                <p>
                    <label>
                        <input type="checkbox" name='jobGuarantee' value={!jobGuarantee}  onChange={onChange} />
                        <span>Job Gurantee?</span>
                    </label>
                </p>

                <p>
                    <label>
                        <input type="checkbox" name='acceptGi' value={!acceptGi}  onChange={onChange} />
                        <span>Accept GI Bill?</span>
                    </label>
                </p>

                <span className="helper-text green-text"><strong>After you add the bootcamp, you can add the specific courses offered</strong></span>

                </div>
            </div>
            <input type="submit" value="Add Bootcamp" className='btn green pulse'/>
            <br/><br/>
            </form>

        </div>
        </Fragment>
    )
}

AddBootcamp.propTypes = {
    addBootcamp: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    authState: state.AuthState
})

export default connect(mapStateToProps, { addBootcamp })(withRouter(AddBootcamp))
