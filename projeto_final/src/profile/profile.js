import React from "react";
import "./profile.css";
import imageLogo from "./instapicslogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowCircleRight,} from "@fortawesome/free-solid-svg-icons";

const username = sessionStorage.getItem("user");
const token = sessionStorage.getItem("tkn");
let id;
let i = 1;
function userNames() {
  //função para recolher os dados do utilizador que está logado no momento//
  fetch(
    `http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/user/details/${username}/${token}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("theName").innerHTML =
        data.firstName + " " + data.lastName;
      document.getElementById("bio").innerHTML = data.bio;
    });
  fetch(
    `http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${username}`
  )
    .then((res) => res.json())
    .then(
      (data) =>
        (document.getElementById(
          "userIMGpro"
        ).src = `data:image/${data[0].format};base64,${data[0].pictureBytes}`)
    );
    fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${username}`)
                .then(res=>res.json())
                .then (data=> {
                  document.getElementById('theUserComent').innerHTML='@'+data[i].username
                  document.getElementById('thePostComent').innerHTML=data[i].description
                  document.getElementById('userIMG').src = `data:image/${data[i].format};base64,${data[i].pictureBytes}` 
                  id=data[i].id
                  console.log(id)

                })
              fetch(`http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/like`)
                .then(res=>res.json())
                .then (data=>
                  document.getElementById('likes').innerHTML=data)
}

function Profile() {
  //carregar a função userNames//
  window.onload = userNames;
  return (
    <body>
      <div className="all">
        <div className="box-header">
          <Link to="/feed">
            <img src={imageLogo} alt="logo" id="instapicslogo-feed" />
          </Link>
          <input id="search" placeholder="Search" />
        </div>
        <div className="userInformation">
          <img alt="userproIMG" id="userIMGpro" className="userIMGpro"></img>
          <p id="theName" className="theNameProfile"></p>
          <p id="theUsername" className="theUsernameProfile">
            @{username}
          </p>
          <p id="bio" className="bio"></p>
          <Link to="/changedetails">
            <button className="icoCog">
              <FontAwesomeIcon className="icoCog" icon={faCog} />
            </button>
          </Link>
          <hr />
        </div>
        <div className="user-post-box">
          <div className="center-part">
            <div className="user-post-img">
              <img alt="Load_Image" id="userIMG"></img>
            </div>
            <div className="interact">
              <button onClick={()=>{
                //Dar like na foto//
                const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009";
                fetch(`${url}/photo/${id}/${token}`, {
                  method: "DELETE"
              }).then(response=>response.text()).then(data=>console.log(data)
              )}}
              >Delete photo</button>
              <p className="numberLikes" id="likes"></p>
              <button
                onClick={() => {
                  const url ="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/";
                  fetch(`${url}/photo/${id}/${username}/${token}`, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(),
                  })
                    .then((response) => response.text())
                    .then((data) => console.log(data));
                }}>
                <FontAwesomeIcon
                  id="heart"
                  className="icoHeart"
                  icon={faHeart}
                />
              </button>
              <button>
                <FontAwesomeIcon className="icoComment" icon={faCommentDots} />
              </button>
            </div>
          </div>
          <div className="user-bottom-part">
            <p className="theUsername" id="theUserComent"></p>
            <p className="comment" id="thePostComent"></p>
            <input
              id="addComment"
              type="text"
              placeholder="Add a comment"
            ></input>
          </div>
        
        <button
          className="previousUSER"
          onClick={() => {
            //mudar a imagem//
            i--;
            fetch(
              `http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${username}`
            )
              .then((res) => res.json())
              .then((data) => {
                document.getElementById("theUsernamePost").innerHTML =
                  "@" + data[i].username;
                document.getElementById("thePostComent").innerHTML =
                  data[i].description;
                document.getElementById(
                  "userIMG"
                ).src = `data:image/${data[i].format};base64,${data[i].pictureBytes}`;
                id=data[i].id
                console.log(id)
              });
            
            fetch(
              `http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/like`
            )
              .then((res) => res.json())
              .then(
                (data) => (document.getElementById("likes").innerHTML = data)
              );
          }}
        >
          <FontAwesomeIcon className="icoArrow" icon={faArrowCircleRight} />
        </button>
        <button
          className="nextUSER"
          onClick={() => {
            //mudar a imagem//
            i++;
            fetch(
              `http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${username}`
            )
              .then((res) => res.json())
              .then((data) => {
                document.getElementById("theUserComent").innerHTML =
                  "@" + data[i].username;
                document.getElementById("thePostComent").innerHTML =
                  data[i].description;
                document.getElementById(
                  "userIMG"
                ).src = `data:image/${data[i].format};base64,${data[i].pictureBytes}`;
                id=data[i].id
                console.log(id)
              });
            fetch(
              `http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009/photo/${id}/like`
            )
              .then((res) => res.json())
              .then(
                (data) => (document.getElementById("likes").innerHTML = data)
              );
          }}
        >
          <FontAwesomeIcon className="icoArrow" icon={faArrowCircleRight} />
        </button>
        </div>
      </div>
    </body>
  );
}
export default Profile;