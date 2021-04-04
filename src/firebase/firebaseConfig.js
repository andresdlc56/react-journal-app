import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD0XMz5rlYU9yjlUx7hdv9l074oONK-TLA",
    authDomain: "react-app-cursos-a46c4.firebaseapp.com",
    projectId: "react-app-cursos-a46c4",
    storageBucket: "react-app-cursos-a46c4.appspot.com",
    messagingSenderId: "586279428605",
    appId: "1:586279428605:web:d1374bd5d12331299cf994"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}