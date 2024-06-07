import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

firebase.initializeApp({
    apiKey: "AIzaSyAyukm8Xi3MYXSLfAFhseqnf-Uj5G1XS4E",
    authDomain: "brightspark-6f72f.firebaseapp.com",
    projectId: "brightspark-6f72f",
    storageBucket: "brightspark-6f72f.appspot.com",
    messagingSenderId: "624037381349",
    appId: "1:624037381349:web:8028219065f6e5b917800c"

})
const auth = firebase.auth();
const firestore = firebase.firestore();


export { auth, firestore }; 
