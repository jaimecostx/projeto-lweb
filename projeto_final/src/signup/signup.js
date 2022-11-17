import './signup.css';
import React, { useState } from 'react';
import imageLogo from './instapicslogo.png';

function Signup() {

  const [firstName,SetFirstName]=useState('');
  const [lastName,SetLastName]=useState('');
  const [username,SetUsername]=useState('');
  const [password,SetPassword]=useState('');
  const [bio,SetBiografia]=useState('');
  


  return (
    <body>
      <div className="backImg">
        <div className="box">
          <div className="header">
            <img src={imageLogo} alt="logo" id="instapicslogo"/>
          </div>
          <div className="txt">
            <div className="together">
              <input id="fName-signup" placeholder="First Name" value={firstName} onChange={(event)=>{SetFirstName(event.target.value)}}/>
              <input id="lName-signup" placeholder="Last Name" value={lastName} onChange={(event)=>{SetLastName(event.target.value)}}/>
            </div>
            <input id="user-signup" placeholder="Username" value={username} onChange={(event)=>{SetUsername(event.target.value)}}/>
            <input id="pw-signup" type="password" placeholder="Password" value={password} onChange={(event)=>{SetPassword(event.target.value)}}/>
            <textarea id="bio-signup" className="message" placeholder="Biografia" maxLength='160' value={bio} onChange={(event)=>{SetBiografia(event.target.value)}}></textarea>
          </div>
          <div className="btn">
              <button id="signup" onClick={()=>{
                //fetch para fazer o registro, inclui a receção dos dados: firstname, lastname, username, password e bio//
                const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009"
                const body={firstName:firstName,lastName:lastName,username:username,password:password,bio:bio}
                fetch(`${url}/user`,{
                  method:'post',
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify(body)
                })
                .then ((response)=>{
                  if(response.ok){
                    window.location = '/';
                    return response.text()
                  }
                  throw new Error("Signup Inválido")
                }).then((token)=>{
                  console.log(token);
                }).catch((error)=>alert(error));
              }
            
              }>Sign Up</button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Signup;
