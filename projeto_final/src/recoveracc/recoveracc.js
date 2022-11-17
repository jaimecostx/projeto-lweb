import './recoveracc.css';
import React, {useState} from 'react';
import imageLogo from './instapicslogo.png';



function Recoveracc() {

  const[user, setUser]=useState('');
  return (
    <body>
        <div className="box-main">
          <div className="header-main">
              <img id="instapicslogo-main" src={imageLogo} alt='logo'></img>
          </div>
        <div className="txt-main">
            <input id="user-main" value={user} placeholder='Username' onChange={(event)=>{setUser(event.target.value)}} />
            
        </div>
        <div className="btn-main">
          <button id="recover" onClick={()=>{
            //verificar se existe o username associado a alguma conta que o utilizador quem recuperar//
                const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009"
            fetch(`${url}/user`,{
              method:'GET',
              headers:{"Content-Type":"application/json"}
            }).then(res=>res.text())
            .then (data => {
                sessionStorage.user = user;
                console.log (JSON.parse (data))
                return JSON.parse (data)
          }).then (data => {
            for (let j=0; j<6 ;j++){
              //caso haja algum username redireciona para a pagina /recoveraccmail//
              if (user === data[j].username){
                  window.location = '/recoveraccmail'
              }
            }
              throw new Error("Username does not exist!!")
            }).catch((error)=>alert(error));
          }}>Next</button>
          </div>
          <div className="footer-main2">
              <p id='done-main'> Feito por: Jaime & João </p> 
          </div>
        </div>
    </body>
    );
        }
export default Recoveracc;