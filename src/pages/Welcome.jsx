import { useAuth } from '../controllers/userState';
import React, { useState } from "react";
import { auth } from '../context/firebase';
import { useFirebase } from "../context/firebase";
import "../styles/Welcome.css"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"


const WelcomePage = (props) => {
    const firebase = useFirebase();
    const { user } = props;
    // const [value, setValue] = useState("");
    const [formValues, setFormValues] = useState("");
    // const [value2, setValue2] = useState("");
    const userEmail = user.email;
    const userId = user.uid;
    const handleInputChange = (e) => {
        // setValue(e.target.value1);
        // setValue(e.target.value2);
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
      };
    
      const handleSubmit = () => {
        firebase.putData('podcast',{...formValues })
        .then(alert("Successfully Updated Podcast data"));
      };

    // alert("props passed");
    if (user) {
        const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
        const userEmail = user.email;
        const userId = user.uid;
        return (
                <div className="signedin">
                  <h1>
                    hello {user.displayName} {user.email}
                  </h1>
                  <label>Podcast 1</label>
                  <input id = "pod1" type="text" value={formValues.pod1|| ''} onChange={handleInputChange} />
                  <label>Podcast 2</label>
                  <input id = "pod2" type="text" value={formValues.pod2|| ''} onChange={handleInputChange} />
                  <button onClick={handleSubmit}>Submit</button>
                  <button onClick={() => signOut(auth)}>Logout</button>
                </div>
          );
    }else{alert("there is some error")};
}
export default WelcomePage;