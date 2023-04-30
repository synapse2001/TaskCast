import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase"
import { useAuth } from "../controllers/userState";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/Test";


const PodcastPlayer = (props) => {
  const {user} =props;
  const firebase = useFirebase();
  const [podcastData, setPodcastData] =
        useState([
            {
                "title": "NCS - test",
                "url": ""
            },
            {
                "title": "Smoke",
                "url": ""
            }]
        );

  useEffect(() => {
    // alert("jendnnndnej");
    // alert(firebase.podData.pod1)
    // useEffect(() => {
        // if (firebase.podData) {
          setPodcastData(prevState => {
            const newData = [...prevState];
            newData[0].url = firebase.podData.pod1;
            newData[1].url = firebase.podData.pod2;
            return newData;
          });
        // }
    //   }, []);
      
  }, [firebase.podData]);

  return (
    <div>
      <TestPage 
        user={user}
        podcastData={podcastData}
      />
    </div>
  );
};

export default PodcastPlayer;

