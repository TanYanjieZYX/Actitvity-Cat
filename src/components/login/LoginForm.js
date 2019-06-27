import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateInput from '../../utils/validations/login';
import { login } from '../../actions/authActions';
import { withRouter } from 'react-router-dom'; 

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.props.history.push('/event'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  render() {
    const { username, password, isLoading, errors } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>

        { errors.form && console.log(errors.form) }

        <div className="form-content">
              <div className="form-user">
                <span className="iconfont icon-user"></span>

                <input
                  value={ username }
                  onChange={ this.onChange }
                  type="text"
                  name="username"
                  placeholder="Email"
                  className="form-control"
                />
                { errors.username && console.log(errors.username) }
              </div>

              <div className="form-pwd">
                <span className="iconfont icon-password"></span>

                <input
                  value={ password }
                  onChange={ this.onChange }
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
                { errors.password && console.log(errors.password) }
              </div>
              <div className="form-button">
                <button disabled={ isLoading } className="button">
                  SIGN IN
                </button>
              </div>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(null, { login })(LoginForm));