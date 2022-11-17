import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCommentDots, faHeart} from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faSignOutAlt, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import userImg from './default-user-image.png';
import imageLogo from './instapicslogo.png';
import './feed.css';


const username = sessionStorage.getItem('user');
const token = sessionStorage.getItem('tkn');

let id;
let i=2;
function userThings () {
  //função para obter todos os dados do utilizador//
  fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/user/details/${username}/${token}`)
  .then(res=>res.json())
  .then (data=>
    document.getElementById('theName').innerHTML=data.firstName +' '+ data.lastName)
    fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo`)
                .then(res=>res.json())
                .then (data=> {
                  document.getElementById('theUserComent').innerHTML='@'+data[i].username
                  document.getElementById('theUsernamePost').innerHTML='@'+data[i].username 
                  document.getElementById('thePostComent').innerHTML=data[i].description
                  document.getElementById('userIMGpro').src = `data:image/${data[i].format};base64,${data[i].pictureBytes}` 
                  id=data[i].id
                })
              fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/like`)
                .then(res=>res.json())
                .then (data=>
                  document.getElementById('likes').innerHTML=data) 
                  fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${username}`)
                  .then((res) => res.json())
                  .then((data) =>
          (document.getElementById("sideUser").src = `data:image/${data[0].format};base64,${data[0].pictureBytes}`))
                }

function Feed() {

  const [text,setText] = useState('');
  //carregar a funçao userThings//
  window.onload = userThings;
  return (
    <body>
      <div className="all">     
        <div className="box-header">
          <img src={imageLogo} alt="logo" id="instapicslogo-feed"/>
          <input id="search" placeholder="Search"/>
        </div>
        
      <div className="post-box">
        <div className="top-part">
            <img id="userImg" src={userImg} alt="userImg"></img>
            <div className="text">
                <p className="theUsername" id='theUsernamePost'></p>
            </div>
        </div>
        <div className="center-part">
          <div className="post-img">
            <img alt="Load_Image" id="userIMGpro"></img>
          </div>
          <div className="interact">
            <p className="numberLikes" id='likes'></p>
            <button class="like"  onClick={()=>{
              //fetch para dar like//
               const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/"
               fetch(`${url}/photo/${id}/${username}/${token}`, {
                method: "PATCH",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(),
            }).then(response=>response.text()).then(data=>console.log(data))
            }}>
              <FontAwesomeIcon className="icoHeart" icon={faHeart} />
            </button> 
                      
            <button onClick={()=>{
              //fetch para fazer comentário//
              const body = {text:text,username:username}
            fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/comment/${token}`, {
              method: "PATCH",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify(body),
          }).then((response)=>{
            if(response.ok){
              return response.text()
            }
            throw new Error("Nao foi possível fazer o comentário.")
          }).catch((error)=>alert(error));
        }}>
              <FontAwesomeIcon className="icoComment" icon={faCommentDots} />
            </button>
          </div>
        </div>
        <div className="bottom-part">
          <p className="theUsername" id='theUserComent'></p>
          <p className="comment" id='thePostComent' ></p>
          <input id="addComment" type="text" maxLength='160' value={text} placeholder="Add a comment" onChange={(event)=>{setText(event.target.value)}}></input>
        </div> 
      </div>
      <button className="previous" onClick={()=>{
              i--;   
              //fetch para carregar e mostrar as fotos//
              fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo`)
                .then(res=>res.json())
                .then (data=> {
                  document.getElementById('theUserComent').innerHTML='@'+data[i].username
                  document.getElementById('theUsernamePost').innerHTML='@'+data[i].username 
                  document.getElementById('thePostComent').innerHTML=data[i].description
                  document.getElementById('userIMGpro').src = `data:image/${data[i].format};base64,${data[i].pictureBytes}` 
                  id=data[i].id
                })
                //fetch para mostrar os likes//
              fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/like`)
                .then(res=>res.json())
                .then (data=>
                  document.getElementById('likes').innerHTML=data) 
              
            }}><FontAwesomeIcon className="icoArrow" icon={faArrowCircleRight} /></button>
      <button className="next" onClick={()=>{
              i++;   
              //fetch para carregar e mostrar as fotos//
              fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo`)
                .then(res=>res.json())
                .then (data=> {
                  document.getElementById('theUserComent').innerHTML='@'+data[i].username
                  document.getElementById('theUsernamePost').innerHTML='@'+data[i].username 
                  document.getElementById('thePostComent').innerHTML=data[i].description
                  document.getElementById('userIMGpro').src = `data:image/${data[i].format};base64,${data[i].pictureBytes}` 
                  id=data[i].id
                })
                //fetch para mostrar os likes//
              fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/like`)
                .then(res=>res.json())
                .then (data=>
                  document.getElementById('likes').innerHTML=data) 
              
            }}><FontAwesomeIcon className="icoArrow" icon={faArrowCircleRight} /></button>
      <div className="side">
        <div className="user-box"> 
          <a href="/profile">
            <img id="sideUser" src={userImg} style={{cursor: "pointer"}} alt="userImg"></img>
          </a>
            <div className="userInfo">
              <p className="theName" id="theName"></p>
              <p className="theUsername">@{username}</p>
            </div>
            <button  onClick={()=>{
              //fetch para fazer logout//
            const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009"
            fetch(`${url}/logout/${username}/${token}`,{
              method:'post',
              headers:{"Content-Type":"application/json"},
            })
            .then((response)=>{
              if(response.ok){
                //remover os sessionstorages guardados//
                sessionStorage.removeItem("tkn");
                sessionStorage.removeItem("user");
                window.location = '/';
                return response.text()
              }
              throw new Error("Erro no Logout")
            }).catch((error)=>alert(error));
          }}><FontAwesomeIcon className="icoSignout" icon={faSignOutAlt} /></button>
        </div>
        <div className="newUser-box">
          <div className="persona">
            <img id="newUser" src={userImg} alt="userImg"></img>
            <div className="sideTxt">
              <p className="theName">Dolor Sit</p>
              <p className="theUsername">@dolorsit</p>
              <button>
              <FontAwesomeIcon className="icoPlus1" icon={faPlusCircle} />
              </button>
            </div>
              <img id="newUser2" src={userImg} alt="userImg"></img>
            <div className="sideTxt2">
              <p className="theName">Dolor Sit</p>
              <p className="theUsername">@dolorsit</p>
              <button>
                <FontAwesomeIcon className="icoPlus2" icon={faPlusCircle} />
              </button>
            </div>
          </div>
        </div>
        <div className="newbutton">
          <button id="newPost" onClick={()=>{
            window.location = '/post';
          }}>New Post</button>
          <div>
            
          </div>
          </div>
      </div>
      </div>
    </body>
    );
  }


export default Feed;
