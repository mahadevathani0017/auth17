
import React,{useState} from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {app} from '../firebase';

const auth=getAuth(app);

function SignUp() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth,email,password).then((value)=>{
      return alert("Success");
    }
  );
  };
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <label>Email</label>
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email here" />
      <label>Password</label>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password here" />
      <button onClick={createUser}>Sign Up</button>
    </div>
  );
};

export default SignUp;
