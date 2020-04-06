import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ authState, authState: { isAuthenticated } , component: Component, ...rest }) => {

  return (
    <Route {...rest} 
    render={props => !isAuthenticated ? <Redirect to="/"/> 
    : <Component {...props}/>}/> 
  )
}

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  authState: state.AuthState
})

export default connect(mapStateToProps, {})(PrivateRoute)
