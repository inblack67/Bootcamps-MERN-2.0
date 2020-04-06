import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Preloader from '../../dumb/Preloader'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { deleteBootcamp, uploadBootcampPhoto } from '../../../actions/bootcamps'
import { useState } from 'react'
import AutoInitBot from '../AutoInitBot'

const ManageBootcamp = ({ history, uploadBootcampPhoto, bootcampState: { bootcamp, loading }, deleteBootcamp }) => {

    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Image')

    const onDelete = e => {
        deleteBootcamp(_id)
        history.push('/bootcamps')
    }

    const onChange = e => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log('fired!');
        console.log(file);
        const formData = new FormData()
        formData.append('file', file)
        uploadBootcampPhoto(formData, _id)
        history.push('/bootcamps')
    }


    if(loading || !bootcamp){
        return <Preloader />
    }


    const { photo, name, _id, location, averageRating, description } = bootcamp

    return (
        <Fragment>
            <AutoInitBot />
            <div className='container'>

                <div className="container">

                <p className="flow-text center">Manage Bootcamp</p>
                <br/>
                <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light" >
                    <img className="activator responsive-img" alt='' src={`/uploads/${photo}`} />
                </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{name}<i className="material-icons right">more_vert</i></span>
                <br/>
                <p>
                    <Link to={`/bootcamps/${_id}`}>Explore</Link>
                    <a href='#!' onClick={onDelete} className='red-text secondary-content'>Delete</a>
                </p>
                <br/>
                <p>
                    <Link to={`/update-bootcamp`} className='green-text'>Update Details</Link>
                </p>
                <br/>
                <p>
                    <Link to={`/manage-courses`} className='grey-text'>Manage Courses</Link>
                </p>
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
            <Link to={`/bootcamps/${_id}`} className='btn black pulse'>Explore</Link>
            </div>
            </div>
            </div>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="file-field input-field">
                        <div className="btn red">
                            <span>{fileName}</span>
                            <input type="file" name='file' onChange={onChange} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" required />
                            <span className="helper-text">Add/Update Bootcamp Image</span>
                        </div>
                        <br/>
                </div>
                <div className="input-field center">
                    <input type="submit" value="Upload" className='btn black'/>
                </div>
            </form>

            </div>
        </Fragment>
    )
}

ManageBootcamp.propTypes = {
    bootcampState: PropTypes.object.isRequired,
    deleteBootcamp: PropTypes.func.isRequired,
    uploadBootcampPhoto: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState
})

export default connect(mapStateToProps, { deleteBootcamp, uploadBootcampPhoto })(withRouter(ManageBootcamp))
