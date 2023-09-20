import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import './style.css';
import setAuthToken from '../utils/setAuthToken';
import {setCurrentUser} from '../actions/authActions';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LockScreen extends Component {

  constructor(props) {
    super(props);
    if(!this.props.auth.isAuthenticated) {
      window.location.href = '/';
    }
  }
  componentDidMount() {
    if(!jwt_decode(localStorage.jwtToken).locked) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const payload = {
        handle: decoded.handle,
        id: decoded.id,
        password: decoded.password,
        name: decoded.name,
        isTodayEventChecked: decoded.isTodayEventChecked,
        isNotificationChecked: decoded.isNotificationChecked,
        currentNotificationCheck: decoded.currentNotificationCheck,
        notificationCheck: decoded.notificationCheck,
        locked: true,
      }
      jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
        localStorage.setItem('jwtToken', "Bearer " + token);
        setAuthToken(token);
      })    
    }
  }

  onClickLogout(e) {
    e.preventDefault();
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    setCurrentUser({});
    window.location.href = '/';
    // this.props.history.push('/');
  }

  onClickSubmitBtn(e) {
    e.preventDefault();
    $("#lockbody").removeClass('headShake');
    $("#lockbody").removeClass('animated');
    const decoded = jwt_decode(localStorage.jwtToken);
    bcrypt.compare($("#pwd").val(), decoded.password)
    .then(isMatch => {
      if(isMatch) {
        const payload = {
          handle: decoded.handle,
          id: decoded.id,
          password: decoded.password,
          name: decoded.name,
          isTodayEventChecked: decoded.isTodayEventChecked,
          isNotificationChecked: decoded.isNotificationChecked,
          currentNotificationCheck: decoded.currentNotificationCheck,
          notificationCheck: decoded.notificationCheck,
          locked: false,
        }
        jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
          localStorage.setItem('jwtToken', "Bearer " + token);
          setAuthToken(token);
        })
        // this.props.history.goBack();
        window.location.href = decoded.prelocation != undefined ? (decoded.prelocation) : ('/');
        // if(decoded.prelocation != undefined) {
        //   window.location.href = decoded.prelocation;
        // } else {
        //   this.props.history.goBack();
        // }
        // decoded.prelocation != undefined ? (window.location.href = decoded.prelocation):();
      } else {
        $("#lockbody").addClass('headShake');
        $("#lockbody").addClass('animated');
      }
    })
  }
  render() {
    const {errors} = this.props;
    
    return(
      <div className="LockScreenMainBody">
        <div className="page-lock">
          <div className="page-logo">
          </div>
          <div className="page-body" id = "lockbody">
            <div className="lock-head"> 화면잠금 </div>
            <div className="lock-body">
              <div className="pull-left lock-avatar-block">
                {/* <img src="../assets/pages/media/profile/photo3.jpg" className="lock-avatar" />  */}
                <img src = {logo} alt="logo" className = "lock-avatar"/> 
              </div>
              <form className="lock-form pull-left" action="index.html" method="post" onSubmit = {this.onClickSubmitBtn.bind(this)}>
                <h4>{this.props.auth.user.handle}</h4>
                <div className="form-group">
                  <input className="form-control placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" name="password" id = "pwd"/> 
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" onClick = {this.onClickSubmitBtn.bind(this)}><i className = "fa fa-unlock"></i></button>
                </div>
              </form>
            </div>
            <div className="lock-bottom">
                <a onClick = {this.onClickLogout.bind(this)}>가입탈퇴<i className = "fa fa-sign-out"></i></a>
            </div>
          </div>
          {/* <div className="page-footer-custom"> 2014 &copy; Metronic. Admin Dashboard Template. </div> */}
        </div>
      </div>
    )
  }
}


LockScreen.propTypes = {
  errors:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
})
export default connect(mapStateToProps)(withRouter(LockScreen));