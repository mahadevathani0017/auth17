import React, { useState } from 'react'
import { getAuth,signInWithEmailAndPassword} from "firebase/auth";
import { app } from '../firebase';

const auth=getAuth(app);

function SignIn() {

 const [email,setEmail]=useState(" ");
 const [password,setPassword]=useState("");

 const signUser = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((value)=>console.log("Signin Success"))
    .catch((err)=> console.log(err));
 }

  return (
    <div className='signin-page'>
        <h1>Sigin Page</h1>
      <label>Enter Your email</label>
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter your Email here"/>
      <label>Enter Your password</label>
      <input onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" placeholder="Enter your password here"/>
      <button onClick={signUser}> Sign In</button>
    </div>
  );
}

export default SignIn;

