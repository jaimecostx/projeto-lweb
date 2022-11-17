import './login.css';
import React, {useState} from 'react';
import imageLogo from './instapicslogo.png';
import {Link} from 'react-router-dom';


function Login() {

  const[username, setUsername]=useState('');
  const[password, setPassword]=useState('');

  return (
    <body>
        <div className="box-main">
          <div className="header-main">
              <img id="instapicslogo-main" src={imageLogo} alt='logo'></img>
          </div>
        <div className="txt-main">
            <input id="user-main" value={username} placeholder='Username' onChange={(event)=>{setUsername(event.target.value)}} />
            <input id="pw-main" value={password} type="password" placeholder='Password' onChange={(event)=>{setPassword(event.target.value)}} />
        </div>
        <div className="btn-main">
          <button id="login-main" onClick={()=>{
            //fetch para confirmar o login//
            const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009"
            const body={username:username,password:password}
            fetch(`${url}/login`,{
              method:'post',
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(body)
            })
            .then((response)=>{
              if(response.ok){
                window.location = '/feed';
                return response.text()
              }
              throw new Error("Invalid Login->Wrong username or password")
            }).then((token)=>{ 
              sessionStorage.setItem('tkn', token);
              sessionStorage.user=username;
              console.log(token);
            }).catch((error)=>alert(error));
          }}>Login</button>
            <p className="createAcc">Don't have an account?</p>
          <Link to='/signup'>
            <button id="signup-main">Sign Up</button>
          </Link>
          <p className="createAcc">Lost your password?</p>
          <Link to='/recoveracc'>
            <button id="recover-main">Recover Acc</button>
          </Link>
          </div>
          <div className="footer-main">
              <p id='done-main'> Feito por: Jaime & João </p> 
          </div>
        </div>
    </body>
    );
        }
export default Login;