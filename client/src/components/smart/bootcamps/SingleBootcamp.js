import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSingleBootcamp } from '../../../actions/bootcamps'
import Preloader from '../../dumb/Preloader'
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteBootcamp } from '../../../actions/bootcamps'
import { withRouter, Link } from 'react-router-dom'
import { getCoursesByBootcamp } from '../../../actions/courses'

const SingleBootcamp = ({ history, authState, deleteBootcamp, getSingleBootcamp, match, bootcampState: { bootcamp, loading } }) => {

    useEffect(() => {
        getSingleBootcamp(match.params.id)
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        M.AutoInit()
    })

    const onDelete = e => {
        deleteBootcamp(bootcamp._id)
        history.push('/bootcamps')
    }

    if(loading || !bootcamp){
        return <Preloader />
    }

    const { name, _id, description, averageCost, photo, averageRating, location, careers, housing, jobAssistance, jobGuarantee, acceptGi, website } = bootcamp

    return (
        <div className="container">
            <br/>
            <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light" >
                    <img className="activator responsive-img" alt='' src={`/uploads/${photo}`} />

                </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{name}<i className="material-icons right">more_vert</i></span>
                <br/>

                <p>
                    <Link to={`/bootcamps/${_id}/reviews`} className='grey-text'>Reviews</Link>
                </p>

                <br/>

                <p>
                    <Link to={`/bootcamps/${_id}/courses`}>Courses</Link>
                </p>
                <br/>

                { authState.isAuthenticated && ( authState.user.role === 'admin' || ( authState.user._id === bootcamp.user ) ) && <Fragment>
                <p>
                    <Link to={`/update-bootcamp`} className='green-text'>Update Details</Link>
                    <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                </p>
                <br/>
                <p>
                    <Link to={`/manage-bootcamp`} className='red-text'>Manage Bootcamp</Link>
                </p>

                <br/>
                <p>
                    <Link to={`/add-course`} className='grey-text'>Add Course</Link>
                </p>
                </Fragment> }

                <br/>
                { location.city === '' ? <p><i className="material-icons left">location_off</i><br/></p> : 
                <p><i className="material-icons left">location_on</i>{location.city}
                    <span className="red-text secondary-content"><strong>
                        {Math.round(averageRating).toString()} Rating
                        </strong></span>
                </p>}
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{name}<i className="material-icons right">close</i></span>
            <p>{description}</p>
            <br/>

            <blockquote>Average Course Cost: <span className="red-text"><strong>${averageCost}</strong></span></blockquote>

            <br/>

            <p>
                { housing ? <i className="material-icons left">check</i> : <i className="material-icons left">close</i> }
                Housing
            </p>

            <p>
                { jobAssistance ? <i className="material-icons left">check</i> : <i className="material-icons left">close</i> }
                Job Assistance
            </p>

            <p>
                { jobGuarantee ? <i className="material-icons left">check</i> : <i className="material-icons left">close</i> }
                Job Gurantee
            </p>

            <p>
                { acceptGi ? <i className="material-icons left">check</i> : <i className="material-icons left">close</i> }
                Accepts Gi Bill
            </p>

            <br/>

            <h6>Careers</h6>
            <p>
            {  careers.map(career => (
            <li key={career} className='collection-item'>
                {career}
            </li>
            ))}
            </p>

            <br/>

            <p>
            <a href={website} target='_blank' rel='noopener noreferrer' className='btn red'>Visit Website</a>
            </p>
            
            </div>
            </div>

                    { authState.isAuthenticated && ( authState.user.role === 'admin' || ( authState.user._id === bootcamp.user ) ) && <Fragment>
            <div className="fixed-action-btn">
            <Link to='/manage-bootcamp' className="btn-floating waves-effect btn-large waves-light red"><i className="material-icons">publish</i></Link>
                <ul>
                    <li>
                    <a href='#!' onClick={onDelete} className='btn-floating waves-effect waves-light red'><i className="material-icons">delete</i></a>
                    </li>
                    <li>
                    <Link to='/update-bootcamp' className="btn-floating waves-effect waves-light black"><i className="material-icons">mode_edit</i></Link>
                    </li>
                    <li>
                    <Link to='/add-course' className="btn-floating waves-effect waves-light green"><i className="material-icons">add</i></Link>
                    </li>
                </ul>
            </div>
            </Fragment> }
            

            <br/>
            <hr/>
            <br/>

            <br/>

        </div>
    )
}

SingleBootcamp.propTypes = {
    getSingleBootcamp: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    deleteBootcamp: PropTypes.func.isRequired,
    getCoursesByBootcamp: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    authState: state.AuthState,
})

export default connect(mapStateToProps, { getSingleBootcamp, deleteBootcamp, getCoursesByBootcamp })(withRouter(SingleBootcamp))
