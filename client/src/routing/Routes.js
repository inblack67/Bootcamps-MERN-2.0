import { Switch, Route } from 'react-router-dom'

import About from '../components/dumb/About';
import NotFound from '../components/dumb/NotFound';
import Home from '../components/dumb/Home';
import Bootcamps from '../components/smart/bootcamps/Bootcamps';
import SingleBootcamp from '../components/smart/bootcamps/SingleBootcamp';
import Register from '../components/smart/auth/Register';
import Login from '../components/smart/auth/Login';
import Dashboard from '../components/smart/dashboard/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import UpdateDetails from '../components/smart/auth/UpdateDetails';
import UpdatePassword from '../components/smart/auth/UpdatePassword';
import Users from '../components/smart/users/Users'
import SingleUser from '../components/smart/users/SingleUser'
import UpdateUser from '../components/smart/users/UpdateUser'
import AddUser from '../components/smart/users/AddUser';
import AddBootcamp from '../components/smart/bootcamps/AddBootcamp';
import UpdateBootcamp from '../components/smart/bootcamps/UpdateBootcamp';
import ManageBootcamp from '../components/smart/bootcamps/ManageBootcamp';
import Courses from '../components/smart/courses/Courses';
import CoursesByBootcamp from '../components/smart/courses/CoursesByBootcamp';
import AddCourse from '../components/smart/courses/AddCourse';
import UpdateCourse from '../components/smart/courses/UpdateCourse';
import SingleCourse from '../components/smart/courses/SingleCourse';
import Reviews from '../components/smart/reviews/Reviews';
import ReviewsByBootcamp from '../components/smart/reviews/ReviewsByBootcamp';
import SingleReview from '../components/smart/reviews/SingleReview';
import AddReview from '../components/smart/reviews/AddReview';
import UpdateReview from '../components/smart/reviews/UpdateReview';

import React from 'react'

const Routes = () => {
    return (
        <Switch>
          {/* auth & users */}
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          <PrivateRoute exact path='/update-details' component={UpdateDetails}/>
          <PrivateRoute exact path='/update-password' component={UpdatePassword}/>
          <PrivateRoute exact path='/users' component={Users}/>
          <PrivateRoute exact path='/users/:id' component={SingleUser}/>
          <PrivateRoute exact path='/users/user/:id' component={UpdateUser}/>
          <PrivateRoute exact path='/add-user' component={AddUser}/>

          {/* home */}
          <Route exact path='/' component={Home}/>

          {/* bootcamps */}
          <Route exact path='/bootcamps' component={Bootcamps}/>
          <Route exact path='/bootcamps/:id' component={SingleBootcamp}/>
          <PrivateRoute exact path='/add-bootcamp' component={AddBootcamp}/>
          <PrivateRoute exact path='/update-bootcamp' component={UpdateBootcamp}/>
          <PrivateRoute exact path='/manage-bootcamp' component={ManageBootcamp}/>

          {/* courses */}
          <Route exact path='/courses' component={Courses}/>
          <Route exact path='/bootcamps/:id/courses' component={CoursesByBootcamp}/>
          <Route exact path='/courses/:id' component={SingleCourse}/>
          <PrivateRoute exact path='/add-course' component={AddCourse}/>
          <PrivateRoute exact path='/update-course/:id' component={UpdateCourse}/>

          <Route exact path='/reviews' component={Reviews}/>
          <Route exact path='/bootcamps/:id/reviews' component={ReviewsByBootcamp}/>
          <Route exact path='/reviews/:id' component={SingleReview}/>
          <PrivateRoute exact path='/add-review' component={AddReview}/>
          <PrivateRoute exact path='/update-review/:id' component={UpdateReview}/>

          {/* initialState */}
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/about' component={About}/>
          <Route component={NotFound}/>
        </Switch>
    )
}


export default Routes
