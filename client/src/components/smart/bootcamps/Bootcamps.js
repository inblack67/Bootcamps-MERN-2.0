import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllBootCamps, getBootcampByDistance } from '../../../actions/bootcamps'
import Preloader from '../../dumb/Preloader'
import BootcampItem from './BootcampItem'
import { Link } from 'react-router-dom'
import AutoInitBot from '../AutoInitBot'

const Bootcamps = ({ getBootcampByDistance, getAllBootCamps, bootcampState: { loading, bootcamps }, authState}) => {
    useEffect(() => {
        getAllBootCamps()
        // eslint-disable-next-line
    },[])

    const [formData, setFormData] = useState({
        zipcode: '',
        distance: ''
    })

    const [filterData, setFilterData] = useState({
        averageCost: 0,
        averageRating: 0
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFilterChange = e => {

        let options = e.target.options
        let value;

        for (const i in options) {
            if(options[i].selected){
                value = options[i].value
            }
        }

        setFilterData({
            ...filterData,
            [e.target.name]: value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        getBootcampByDistance(zipcode, distance)
    }

    const onFilter = e => {
        e.preventDefault()
        console.log(filterData);
        getAllBootCamps(filterData)
    }

    if(loading || !bootcamps)
    {
        return <Preloader />
    }

    if(bootcamps.length === 0){
        return <Fragment>
        <div className="container center" style={{'marginBottom': '15rem'}}>
            <p className="flow-text">No Bootcamps Yet.</p>
            { authState.user && (authState.user.role === 'admin' || authState.user.role === 'publisher') && <Fragment>
                <Link to='/add-bootcamp' className='btn red pulse'>Add Bootcamp</Link>
            </Fragment> }
        </div>
        </Fragment>
    }
    
    const isEligible = () => {
        const res = bootcamps.filter(b => b.user === authState.user._id)
        if(res.length === 0){
            return true
        }
        else return false
    }

    const { zipcode, distance }  = formData
    const { averageCost, averageRating } = filterData

    return (
        <div className='container'>

            <AutoInitBot />

            { authState.user && (authState.user.role === 'admin' || (
                authState.user.role === 'publisher' && isEligible()
            )) && <Fragment>
            <div className="fixed-action-btn">
                <Link to='/add-bootcamp' className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
            </div>
            </Fragment> }

            <div className="row">
            <div className="col m6 hide-on-small-only">
                <div className="container">
                <p className="flow-text">Location Matters?</p>
                <form onSubmit={onSubmit}>
                    <div className="input-field">
                        <input type="text" name='distance' value={distance} onChange={onChange} className='validate' required/>
                        <span className="helper-text" data-error='Required'>Miles From</span>
                    </div>
                    <div className="input-field">
                        <input type="text" name='zipcode' value={zipcode} onChange={onChange}  className='validate' required/>
                        <span className="helper-text" data-error='Required'>Zipcode</span>
                    </div>
                    <br/>
                    <div className="input-field">
                        <input type="submit" value="Locate" className='btn red '/>
                    </div>
                </form>
                </div>
                <br/>
                <div className="container">
                <p className="flow-text">Filter</p>
                <br/>
                <form onSubmit={onFilter}>
                    <div className="input-field">
                        <select onChange={onFilterChange} name='averageRating' value={averageRating}>
                            <option defaultValue disabled>Any</option>
                            <option value='9'>9+</option>
                            <option value='8'>8+</option>
                            <option value='7'>7+</option>
                            <option value='6'>6+</option>
                            <option value='5'>5+</option>
                        </select>
                        <label>Rating</label>
                    </div>
                    <br/>
                    <div className="input-field">
                        <select onChange={onFilterChange} name='averageCost' value={averageCost}>
                            <option defaultValue disabled>Any</option>
                            <option value='20000'>$20,000</option>
                            <option value='15000'>$15,000</option>
                            <option value='10000'>$10,000</option>
                            <option value='8000'>$8,000</option>
                        </select>
                        <label>Budget</label>
                    </div>
                    <br/>
                    <div className="input-field">
                        <input type="submit" value="Filter" className='btn red '/>
                    </div>
                </form>

                </div>
            </div>
                { bootcamps &&  bootcamps.map(boot => <BootcampItem bootcamp={boot} key={boot._id}/>)}
            </div>
        </div>
    )
}

Bootcamps.propTypes = {
    getAllBootCamps: PropTypes.func.isRequired,
    bootcampState: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    getBootcampByDistance: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    bootcampState: state.BootcampState,
    authState: state.AuthState
})

export default connect(mapStateToProps, { getAllBootCamps, getBootcampByDistance })(Bootcamps)
