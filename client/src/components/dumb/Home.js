import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import img1 from '../../img/boot1.jpg'
import img2 from '../../img/boot2.jpg'
import AutoInitBot from '../smart/AutoInitBot'
import { getBootcampByDistance, getAllBootCamps } from '../../actions/bootcamps'
import PropTypes from 'prop-types'
import Preloader from './Preloader'
import MapboxBoots from '../smart/bootcamps/MapboxBoots'


const Home = ({ getAllBootCamps, bootcampState: { bootcamps, loading } }) => {

  useEffect(() => {
    getAllBootCamps()
    // eslint-disable-next-line
  },[])


if(loading){
  return <Preloader />
}

  return (

    <Fragment>

      <AutoInitBot />

    <div className="parallax-container">
      <div className="parallax"><img src={img1} alt='' className='responsive-img'/></div>
    </div>
    <div className="white center">
      <div className="row container">
        <p className="flow-text">What's the language mode in your VS-Code at the moment?</p>
        <Link to='/bootcamps' className='btn red pulse'>Browse Bootcamps</Link>
        <br/>
        <p className="flow-text">Find A Bootcamp Near You</p>
      <div className='container center'>
        <MapboxBoots bootcamps={bootcamps} />
      </div>
      </div>
    </div>
    <div className="parallax-container">
      <div className="parallax"><img src={img2} alt='' className='responsive-img'/></div>
    </div>

    </Fragment>
  )
}

Home.propTypes = {
  getBootcampByDistance: PropTypes.func.isRequired,
  bootcampState: PropTypes.object.isRequired,
  getAllBootCamps: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  bootcampState: state.BootcampState
})

export default connect(mapStateToProps, { getBootcampByDistance, getAllBootCamps })(withRouter(Home))
