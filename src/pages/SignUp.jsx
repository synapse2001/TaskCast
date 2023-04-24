import React, { useState } from "react";

import { useFirebase } from "../context/firebase";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import "../styles/SignUp.css"
// import "../assets/google_signin.png"
import googleSigninImgDark from '../assets/google_signin.png';
import googleSigninImgLight from '../assets/google_signin_light.png';
import SignInPage from "../pages/SignIn";

// use googleSigninImg variable in your component

// const signUpButton = document.getElementById('signup-button');
// const loadingSpinner = document.createElement('div');
// cannot be used in react//////////////////////////////////////////////////////////////////
// loadingSpinner.className = 'loading-spinner';
//import { unstable_renderSubtreeIntoContainer } from "react-dom";

const refSignInPage =() =>{
    alert("Navigating to signin page");
    return(window.location.href = "/SignInPage");
}
const refAdminPage = () =>{
    alert("Navigating to Admin Page");
    return(window.location.href = "/SignInPage")
}

// const auth = getAuth(app);


const SignUpPage = () => {
    const firebase =useFirebase();
    console.log("firebase", firebase);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleClick(){
        setLoading(true);
        firebase.createUser(email,password)
        .then( ()=>{setLoading(false);alert("Success");firebase.putData('users/' + 'email', { email , password })})
        .catch((error)=>{console.log(error);setLoading(false);alert(error)});
    };

    function handleGoogleSignin(){
        let data =firebase.fetchData('users' + 'userssGOLiZue55gFr11u3r6nwErCbpv1')
        console.log(data);
        alert("signin called");
        firebase.signinwithGoogle();
    }

    return (
        <html>
        <head>
        <title>My Sign Up page </title>
        <link rel="stylesheet" href="./styles/SignUp.css"></link>
        </head>
            <body className="signupbody">
                <section className="animated-background">
                    <div id="stars1"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </section>
                <div className="signup-page">
                <center>
                    <h1 className="title">Taskter</h1>
                </center>
                    <div className="container">
                    <label>Email</label>
                    <input 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email" 
                        required
                        placeholder="Enter your Email here"
                        ></input>
                    <label>Password</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password" 
                        required 
                        placeholder="Enter your Password here">
                    </input>
                    </div>
                    <button id = "signup-button" onClick={()=> handleClick()}>{loading ? "Loading..." : "Sign Up"}</button>
                    <button id = "signup-button" onClick={refSignInPage}>{loading ? "Loading..." : "Existing user Sign In"}</button>
                    <button id = "signup-button" onClick={refAdminPage}>{loading ? "Loading..." : "Admin Sign In"}</button>
                    <img onClick={() => handleGoogleSignin()} src= {googleSigninImgLight} alt="Sign in with Google"></img>
                </div>
            </body> 
    </html>
    )
}

export default SignUpPage;