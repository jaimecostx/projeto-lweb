import React, { useState } from 'react';
import './details.css';
import imageLogo from './instapicslogo.png';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';


function Details () {

    const username = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('tkn');
    const [firstName,SetFirstName]=useState('');
    const [lastName,SetLastName]=useState('');
    const [password,SetPassword]=useState('');
    const [bio,SetBiografia]=useState('');
    
    return (
      <>
            
            <div className="box-header">
          <img src={imageLogo} alt="logo" id="instapicslogo-feed"/>
        </div>
            <div className="box-signup">
          <div className="txt">
            <div className="together">
              <input id="fName-signup" placeholder="First Name" value={firstName} onChange={(event)=>{SetFirstName(event.target.value)}}/>
              <input id="lName-signup" placeholder="Last Name" value={lastName} onChange={(event)=>{SetLastName(event.target.value)}}/>
            </div>
            <input id="pw-signup" type="password" placeholder="Password" value={password} onChange={(event)=>{SetPassword(event.target.value)}}/>
            <textarea id="bio-signup" className="message" placeholder="Biografia" maxLength='160' value={bio} onChange={(event)=>{SetBiografia(event.target.value)}}></textarea>
          </div>
          <div>
            <Link to='/profile'>
            <button  id="signup-details">Voltar atras</button>
            </Link>
          </div>
          
          <div className="btn">  
              <button id="signup" onClick={()=>{
                //fetch do swagger para mudar o detalhes, firstname, last name, password e bio//
                const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009"
                const body={firstName:firstName,lastName:lastName,username:username,password:password,bio:bio}
                fetch(`${url}/user/${token}`,{
                  method:'put',
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
                    //direção do link para /profile//
                      window.location = '/profile'
                  })
                    return response.text()
                  }
                  throw new Error("Erro")
                }).catch((error)=>alert(error));
              }}>Submit</button>
          </div>
        </div>
            
   </> 
    );
}

export default Details;