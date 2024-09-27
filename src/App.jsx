import './App.css'
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from "./firebase";


const auth=getAuth(app);

function App() {

  const signupUser = () => {
    createUserWithEmailAndPassword(
      auth,
      "mahadev@123.gmail",
      "mahadev@123"
    ).then((value)=> console.log(value))
  };
     
  
   return(
    <>
    <h1>Firebase start</h1>
    <button onClick={signupUser}>ClickOn</button>
    </>
   )
}

export default App;
