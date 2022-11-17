import React from 'react';
import {useState} from 'react';
import './post.css';
import swal from 'sweetalert';
import imageLogo from './instapicslogo.png';
import {Link} from 'react-router-dom';

function Post() {

    const token = sessionStorage.getItem('tkn');
    const username = sessionStorage.getItem('user');
    const [description,setDescription] = useState ('');
    const [photoVisibility] = useState ('PRIVATE');
    
    return (
        <>
        <div className="all">
        <div className="box-header">
            <Link to='/feed'>
          <img src={imageLogo} alt="logo" id="instapicslogo-feed"/>
          </Link>
        </div>
        <div className='tudo'>
            
            <div className="ficheiro">
                <input id='imageFileInput' type="file" className='imginput' onClick={()=>{
                    //fetch para fazer upload, carregar e enviar a imagem para o servidor//
            const inputFile=document.getElementById("imageFileInput");

            inputFile.addEventListener("change",(event)=>{
                const file=event.target.files[0];
                if(file){
                    let formData=new FormData();
                    formData.append("file",file);
            
                    const url="http://ec2-3-12-84-208.us-east-2.compute.amazonaws.com:8009";
                    fetch(`${url}/photo/${username}/${description}/${photoVisibility}/${token}`,{
                        method:"POST",
                        body:formData
                    }).then((response)=>{
                        if(response.ok){
                            console.log('Postado');
                            return response.json();
                        }
                        throw new Error("request failed");
                    }).then((json)=>{
                        document.getElementById('imagempost').src = `data:image/${json.format};base64,${json.pictureBytes}`;
                    }).catch((error)=>{alert(error)});
                }});
            }  
        }  
            ></input>
            </div>
            <div className="imgContainer">
                <img id='imagempost' alt="Preview"></img>
            </div>
            <div className="select">
                <select >
                    <option>FAVORITE</option>
                    <option>PRIVATE</option>
                    <option>PUBLIC</option>
                </select>
            </div>
            <div >
                <input className="description" value={description} maxLength='160' placeholder='Comment' onChange={(event)=>{setDescription(event.target.value)}}></input>
            </div>
            <div className="postar">
                <button className='post' onClick={()=>{
                    swal({
                        title: "Sucesso", 
                        text: "Foto Postada", 
                        icon: "success",
                    })
                    .then(()=>{
                        window.location = '/feed'
                    })
                }}>Upload</button>
            </div>
            </div>
        </div>
        </>
    );
} 

export default Post;