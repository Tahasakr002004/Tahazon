import React,{useState} from 'react'
import style from '../cssModules/login.module.css'
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/login-logo.png";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
// import { useAuth } from '../context/globalState';

  
function Login () {
  const [email, setEmail] = useState( '' );
  const [password, setPassword] = useState( '' );
  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword( auth, email, password ).then( ( auth ) => {
      if(auth)
      navigate( "/" );
    } ).catch((error) => alert(error.message));
  }
/////////////////////////////
  const signInUser = ( event ) => {
    event.preventDefault();
    signInWithEmailAndPassword( auth, email, password ).then( ( auth ) => {
      if ( auth ) {
        navigate( "/" ).catch((error) => alert(error.message));
      }
    });
 }



  return (
    <div className={style.login}>
       <Link to="/">
         <img className={style['login-logo']} src={Logo} alt="amazon-log"/>
      </Link>
      <div className={style['login-container']}>
        <h1>Sign in</h1>
        <form>
        <h5>Email</h5>
          <input type="email" value={email} onChange={(event)=> setEmail(event.target.value)} />
           <h5>Passwwrd</h5>
          <input type="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
          <button className={style['login-signInBtn']} type="submit" onClick={signInUser}>Sign in</button>
          <p>By continuing,you agree to tahazon conditions and privacy Notice.</p>
          <button className={style['login-registerBtn']} onClick={registerUser}>Create your Amazon Account</button>
        </form>
      </div>
    </div>
  )
};


export default Login