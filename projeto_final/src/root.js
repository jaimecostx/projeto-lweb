import './root.css';
import React from 'react';
import Login from './login/login';
import Signup from './signup/signup';
import Feed from './feed/feed';
import Post from './post/post';
import Profile from './profile/profile';
import Details from './details/details';
import Recoveracc from './recoveracc/recoveracc';
import Recoveraccmail from './recoveracc/recoveraccmail';
import Recoverpass from './recoveracc/recoverpass';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function Root() {
//Função disponivel em react para auxiliar a mudança de páginas através dos links, deste modo, verificando o path aplica a componente que se segue//
  return (
    <Router>
      <div>
       <Route path="/post" component={Post} />
       <Route path="/feed" component={Feed} />
       <Route path="/" exact component={Login} />
       <Route path="/signup" component={Signup} />
       <Route path="/profile" component={Profile} />
       <Route path="/changedetails" component={Details} />
       <Route path="/recoveracc" component={Recoveracc} />
       <Route path="/recoveraccmail" component={Recoveraccmail} />
       <Route path="/recoverpass" component={Recoverpass} />
       
    </div>
  </Router>
    );
}

export default Root;
