import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteBootcamp } from '../../../actions/bootcamps'

const BootcampItem = ({ authState, deleteBootcamp, bootcamp: { name, _id, averageRating, description, photo, location, user } }) => {

    const onDelete = e => {
        deleteBootcamp(_id)
    }

    return (
        <div>
        <div className="col m6">
            <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light" >
                    <img className="activator responsive-img" alt='' src={`/uploads/${photo}`} />
                </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{name}<i className="material-icons right">more_vert</i></span>
                <p>
                    <Link to={`/bootcamps/${_id}`}>Explore</Link>

                    { authState.isAuthenticated &&  
                    ( authState.user.role === 'admin' || ( authState.user._id === user ) ) && <Fragment>
                    <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                    </Fragment> }
                </p>
                <br/>
                { location.city === '' ? <p><i className="material-icons left">location_off</i><br/></p> : 
                <p><i className="material-icons left">location_on</i>{location.city}
                    <span className="red-text secondary-content"><strong>{ averageRating > 8 &&  <Fragment>
                        { Math.round(averageRating).toString()} Rating
                    </Fragment>  }</strong></span>
                </p>}
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{name}<i className="material-icons right">close</i></span>
            <p>{description}</p>
            <br/>
            <Link to={`/bootcamps/${_id}`} className='btn red pulse'>Explore</Link>
            </div>
            </div>
        </div>
        </div>
    )
}

BootcampItem.propTypes = {
    bootcamp: PropTypes.object.isRequired,
    deleteBootcamp: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authState: state.AuthState
})

export default connect(mapStateToProps, { deleteBootcamp })(BootcampItem)
