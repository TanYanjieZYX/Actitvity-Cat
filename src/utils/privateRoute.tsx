import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.token ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
)

export default connect(state => ({
  user: state.user
}))(PrivateRoute)
