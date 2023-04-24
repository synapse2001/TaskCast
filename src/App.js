import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { app } from "./firebase";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import SignUpPage from "./pages/SignUp";
import WelcomePage from "./pages/Welcome"
import TestPage from "./pages/Test"
import SignInPage from "./pages/SignIn";
import LoadingPage from "./pages/LoadingPage";
import { auth } from './context/firebase';
import { useFirebase } from './context/firebase';
import { useAuth } from './controllers/userState';
import HomePage from './pages/HomePage';
import PodcastDataProvider from './assets/audio';
import PodcastPlayer from './assets/audio';



function App() {

  // const[isloading ,setisLoading] =useState(true);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isResume, setisResume] = useState(0);
  const firebase = useFirebase();
  let resume;
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      firebase.fetchPoddata();
      // alert(firebase.podData.timestamp.ct)
      // setisResume(firebase.podData.timestamp.ct)
    }, 1000); // Replace this with your Firebase auth state listener
  }, []);
  if (isLoading) {
    return <LoadingPage />
  }

  // const {user} = useAuth();
  // waituser();
  if (user === null) {
    if (window.location.pathname === "/SignInPage") {
      return <SignInPage />;
    }
    return <SignUpPage />;
  } else {
    // handleUserAuth(user);
    // alert("hiii")
    const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
        const userEmail = user.email;
        const userId = user.uid;

        if (isNewUser) {
            firebase.putData('users' + userId, { userEmail });
        }
            console.log("Existing User");
        
    if (user.email === 'admin@admin.com') {
      return <WelcomePage user={user} />
    }
    // if(window.location.pathname === "/AdminPage"){
    //    return <WelcomePage user = {user}/>
    // }
    if (window.location.pathname === "/WelcomePage") {
      // setisResume(firebase.podData.timestamp.ct)
      // alert(isResume);
      return <PodcastPlayer user={user} />;
    }
    return (
      window.location.href = "/WelcomePage"
      // <WelcomePage user={user}/>
    );
  }
}

export default App;

