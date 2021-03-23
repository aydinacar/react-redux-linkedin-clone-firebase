import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAUI-wuKq4ePsFhrdZGK3U0gLHeQOlUU4E",
    authDomain: "linkedin-clone-5343b.firebaseapp.com",
    projectId: "linkedin-clone-5343b",
    storageBucket: "linkedin-clone-5343b.appspot.com",
    messagingSenderId: "465439697576",
    appId: "1:465439697576:web:05deced62b4e9354c5709d",
    measurementId: "G-1VKLB04KVB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebaseApp.auth()

export {db, auth}