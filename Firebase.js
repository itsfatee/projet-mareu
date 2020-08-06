import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

//const settings = {timestampsInSnapshots: true};

 const firebaseConfig = {
    apiKey: "AIzaSyAMJSuInS6hBA_k7PQ5r6k97o5sJ7W0Vho",
    authDomain: "db-react-648b8.firebaseapp.com",
    databaseURL: "https://db-react-648b8.firebaseio.com",
    projectId: "db-react-648b8",
    storageBucket: "db-react-648b8.appspot.com",
    messagingSenderId: "275204465476",
    appId: "1:275204465476:web:dff7df460b99faa8dead11",
    measurementId: "G-TR1RSW059N"
  };

    firebase.initializeApp(firebaseConfig);
    
    firebase.firestore();
   

    
    
export default firebase;
