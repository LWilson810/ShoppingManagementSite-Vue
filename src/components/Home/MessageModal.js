import React from 'react';
import {Config} from '../../config/config';
import $ from 'jquery';
import {currentNotificationCheck} from '../../actions/notificationActions';
//import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
//import sign from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

const MessageModal = ({title, content, file, date, props}) => {

  
  function downloadFile() {
    var api = document.createElement('a');
    api.href = `http://${Config.serverIP}:5000/main/notification/download/${$('#download_user').text()}`;
    //axios.get('http://localhost:5000/main/eboard/file/download');
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    api.click();
  }
  
  return(
    <div id="notificationModal" className="editedModal">
        <div className="modal-dialog">
          <div className="modal-content" style = {{width:"100%"}}>
            <div className="modal-header-answer">
              <h4 className="modal-title">{date}:새 알림</h4>
            </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12" style = {{marginTop:"20px",padding:"5px",border:"1px solid lightseagreen", borderRadius:"5px"}}>
                <h1 style = {{fontSize:"20px", margin:"0", padding:"10px" ,color:"blue"}} id = "title">{title}</h1>
                {/* {notification.title} */}
              </div>
              <div className="col-md-12" style = {{marginTop:"20px", padding:"5px", border:"1px solid lightseagreen", borderRadius:"5px", minHeight:"200px"}}>
                <p style = {{fontSize:"15px", margin:"0", padding:"10px" ,color:"black"}} id = "content">{content}</p>
                {/* {notification.content} */}
              </div>
              <div className="col-md-12">
                <a style = {{cursor:"pointer"}} onClick = {() => {
                  downloadFile();
                }}><p id = "download_user">{file}</p></a>
                <input id = "notiCheck" type = "checkbox" onClick = {() => {
                  console.log($("#notiCheck")[0].checked)
                }}/>하루동안 보여주지 않기
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" data-dismiss="modal" className="btn btn-danger" onClick = {() => {
              document.getElementById("notificationModal").style.display = 'none';
              if($("#notiCheck")[0].checked) {
                //window.alert("d");
                const decoded = jwt_decode(localStorage.jwtToken);
                decoded['isNotificationChecked'] = true;
                //localStorage.setItem('jwtToken')
                const payload = {
                  handle: decoded.handle,
                  id: decoded.id,
                  password: decoded.password,
                  locked: decoded.locked,
                  name: decoded.name,
                  isTodayEventChecked: decoded.isTodayEventChecked,
                  isNotificationChecked: decoded.isNotificationChecked,
                  currentNotificationCheck: decoded.currentNotificationCheck,
                  notificationCheck: decoded.notificationCheck,
                }
                //console.log(decoded)
                jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
                  localStorage.setItem('jwtToken', "Bearer " + token);
                  setAuthToken(token);
                })
                //console.log(jwt_decode(localStorage.jwtToken));
                currentNotificationCheck();
              }
              //window.alert("sdf");
              //props.notification.currentNotification = [];
              }}>닫 기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageModal;