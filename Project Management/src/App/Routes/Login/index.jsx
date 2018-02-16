/*
* @component Login
* @type statefull Component
* @children TextBox,Message
* @requires React,connect,withRouter,bindActionCreators,prop-types
* @reduxActions true
* @actions login
* @description
* this is a route component which has url /login
* this component will take user credentials and login him/her
* based on the credentials
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import TextBox from './TextBox';
import Message from './Message';

import { doLogin, authorize, findUser } from './utility';
import { loginAction } from './actions';


import './style.scss';

class Login extends React.Component {
  static propTypes = {
    history: PropTypes.object, //eslint-disable-line
    loginAction: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      btnText: 'Login',
      message: {
        type: 'info',
        text: '',
        visible: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * @method handleChange
   * @memberOf Login Component
   * @param {string} value
   * @param {Object} ev
   * @description this function is a callback func for
   * the onChanges event for a textbox.
   * it has 2 arguments which are value in the textbox
   * and the original event associated with it.
   * we will use it to set the state values with
   * the textbox values.
   */
  handleChange(value, ev) {
    try {
      const { target: { id } } = ev; // ge the id of the tetxbox
      if (id === 'userId') {
        // using immutable concept to set state
        this.setState(prevState => (
          {
            ...prevState,
            userName: value,
          }
        ));
      } else {
        this.setState(prevState => (
          {
            ...prevState,
            password: value,
          }
        ));
      }
    } catch (e) {
      throw e;
    }
  }
  /**
   * @method handleChange
   * @memberOf Login Component
   * @description this function will fire the login request
   * it intern calls dologin of the login utility which returns a promise
   * based on that we perform login logic
   */
  handleSubmit() {
    try {
      // change btn label to please wait
      this.setState(prevState => ({ ...prevState, btnText: 'Please Wait' }));
      // try login
      doLogin()
        .then((success) => {
          if (success) {
            // if success check if user name is correct
            const isAuthorized = authorize(this.state.userName, success.users);
            if (isAuthorized) {
              // navigate to home
              const user = findUser(this.state.userName, success.users);
              this.props.loginAction(user);
              // navigate to home . after successfull login
              this.props.history.push('/');
            } else {
              // show error message
              this.setState(prevState => (
                {
                  ...prevState,
                  btnText: 'Login',
                  message: {
                    ...prevState.message,
                    visible: true,
                    text: 'User Not Authorized !',
                    type: 'danger',
                  },
                }));
            }
          }
        }, () => {
          // show api failure message
          this.setState(prevState => (
            {
              ...prevState,
              btnText: 'Login',
              message: {
                ...prevState.message,
                visible: true,
                text: 'Some Error Occured, Try Again',
                type: 'danger',
              },
            }));
        });
    } catch (e) {
      throw e;
    }
  }
  render() {
    return (
      <article className="login-wrapper">
        <div className="note login-box">
          <section>
            <TextBox
              placeholder="User Name"
              id="userId"
              cssClass="textbox"
              onChanges={this.handleChange}
              type="text"
              value={this.state.userName}
            />
          </section>
          <section>
            <TextBox
              placeholder="Password"
              id="userPassword"
              cssClass="textbox"
              onChanges={this.handleChange}
              type="password"
              value={this.state.password}
            />
          </section>
          <section>
            <button
              disabled={!this.state.userName || !this.state.password}
              className="submit hbtn hbtn-info"
              onClick={this.handleSubmit}
            >
              {this.state.btnText}
            </button>
          </section>
          <section>
            <Message
              type={this.state.message.type}
              message={this.state.message.text}
              visible={this.state.message.visible}
            />
          </section>
        </div>
      </article>
    );
  }
}
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginAction,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
