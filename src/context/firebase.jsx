import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,push, update,get,child} from "firebase/database";

import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithRedirect, 
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvlPL2roLeLOAYSqpWEzBm0RUnOzBMVe4",
    authDomain: "taskter-8e065.firebaseapp.com",
    projectId: "taskter-8e065",
    storageBucket: "taskter-8e065.appspot.com",
    messagingSenderId: "1008578199977",
    appId: "1:1008578199977:web:6934969d6eaed1df7ac4b8",
    measurementId: "G-LTPSM2GMZ4",
    databaseURL : "https://taskter-8e065-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseapp);
const database = getDatabase(firebaseapp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }; 
    const putData = (key,data) => {
        return update(ref(database, key),data);
    };

    const [podData,setpodData] = useState("");

    // const fetchData = async (key) =>{

    //     await( get(child(ref(database),key))
    //     .then((snapshot)=>
    //         setpodData(snapshot.val())));
    // }/////////////////////////////////// imp

    const fetchData = async (key) => {
        const snapshot = await get(child(ref(database), key));
        // setpodData(snapshot.val());
        console.log("data is fetched",snapshot.val());
        return (snapshot.val());
      };

      const fetchPoddata = async () => {
        const snapshot = await get(child(ref(database), "podcast"));
        const data = snapshot.val();
        setpodData(data);
        console.log("poddata is fetched", data);
        return data;
      };
      
      
 

    // const fetchData = async (key) =>{
    //     const snapshot = await get(child(ref(database), key));
    //     return snapshot.val();
    //   }
      

    const signinUser = (email2, password2) => {
        return signInWithEmailAndPassword(auth, email2, password2)
    };
    const signinwithGoogle = () =>{
        return signInWithRedirect(auth, googleProvider);
    }

    return (
        <FirebaseContext.Provider value ={{createUser, putData, signinUser,signinwithGoogle,fetchData, podData,fetchPoddata}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}