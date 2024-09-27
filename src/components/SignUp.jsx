import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import zxcvbn from 'zxcvbn'; 

const auth = getAuth(app);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const strengthScore = zxcvbn(pwd).score;
    setPasswordStrength(strengthScore); 
  };

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) => {
      alert("Success");
    }).catch((error) => {
      alert("Error: " + error.message);
    });
  };

  return (
    <div className="signup-page" style={{ width: "300px", margin: "auto", padding: "20px" }}>
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        required
        placeholder="Enter your email here"
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <label>Password</label>
      <div style={{ position: "relative" }}>
        <input
          onChange={handlePasswordChange}
          value={password}
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter your password here"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer"
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>

       
        {showTooltip && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "0",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              padding: "10px",
              fontSize: "12px",
              width: "100%",
              zIndex: 1
            }}
          >
            <strong>Password Requirements:</strong>
            <ul>
              <li>At least 8 characters</li>
              <li>Includes a number</li>
              <li>Includes a special character</li>
            </ul>
          </div>
        )}
      </div>

      <div style={{ margin: "10px 0" }}>
        <div
          style={{
            height: "5px",
            backgroundColor: passwordStrength >= 3 ? "green" : passwordStrength >= 2 ? "orange" : "red",
            width: `${(passwordStrength + 1) * 20}%`,
            transition: "width 0.3s ease-in-out",
          }}
        />
        <small>{getPasswordStrengthLabel(passwordStrength)}</small>
      </div>

      <button
        onClick={createUser}
        style={{ padding: "10px", width: "100%", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
