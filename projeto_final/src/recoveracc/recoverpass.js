import './recoveracc.css';
import React, {useState} from 'react';
import imageLogo from './instapicslogo.png';
import swal from 'sweetalert';


const username = sessionStorage.getItem('user');
const email = sessionStorage.getItem('email');

function Recoverpass() {
 
    const [password,SetPassword]=useState('');
  return (
    <body>
        <div className="box-main">
          <div className="header-main">
              <img id="instapicslogo-main" src={imageLogo} alt='logo'></img>
          </div>
        <div className="txt-main"> 
        <input id="pw-signup" type="password" placeholder="Password" value={password} onChange={(event)=>{SetPassword(event.target.value)}}/>
        </div>
        <div className="btn-main">
        <button id="recover" onClick={()=>{
          //simulação de mudança de password//
                const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009"
                const body={password:password}
                fetch(`${url}/user/recovery/${username}/${email}`,{
                  method:'post',
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify(body)
                })
                .then ((response)=>{
                  if(response.ok){
                    swal({
                      title: "Sucesso!", 
                      text: "Definições alteradas com sucesso!", 
                      icon: "success",
                  })
                  .then(()=>{
                      window.location = '/';
                      sessionStorage.removeItem('user');
                      sessionStorage.removeItem('email');
                  })
                    return response.text()
                  }
                  throw new Error("Erro")
                }).catch((error)=>alert(error));
              }}>Submit</button>
          </div>
          <div className="footer-main2">
              <p id='done-main'> Feito por: Jaime & João </p> 
          </div>
        </div>
    </body>
    );
        }
export default Recoverpass;