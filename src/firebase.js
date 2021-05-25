 import firebase from 'firebase';


  const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyA9fj-waGFko4i9xT_03mJue-f5pdj8EmY",
    authDomain: "instagram-clone-fc959.firebaseapp.com",
    databaseURL: "https://instagram-clone-fc959-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-fc959",
    storageBucket: "instagram-clone-fc959.appspot.com",
    messagingSenderId: "355190609798",
    appId: "1:355190609798:web:4d6969b136ed54bbe9be07",
    measurementId: "G-HMNG2ZGRWX"

  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage()

  export {db, auth, storage};