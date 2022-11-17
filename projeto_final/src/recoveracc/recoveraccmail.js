import './recoveracc.css';
import React, {useState} from 'react';
import imageLogo from './instapicslogo.png';



function Recoveraccmail() {
  
    const [email,SetEmail]=useState('');

  return (
    <body>
        <div className="box-main">
          <div className="header-main">
              <img id="instapicslogo-main" src={imageLogo} alt='logo'></img>
          </div>
        <div className="txt-main"> 
            <input id="user-main" placeholder='E-mail' type="email" value={email} onChange={(event)=>{SetEmail(event.target.value)}}/>
        </div>
        <div className="btn-main">
          <button id="recover" onClick={()=>{
            //guardar o email para a recuperação (simulação)//
              sessionStorage.email=email;
              window.location = '/recoverpass'
          }}>Send verification code</button>
          </div>
          <div className="footer-main2">
              <p id='done-main'> Feito por: Jaime & João </p> 
          </div>
        </div>
    </body>
    );
        }
export default Recoveraccmail;