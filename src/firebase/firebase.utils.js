import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwgezBQKKxHdg-CFBV4DEiGuVMi_rJgjs",
  authDomain: "crown-db-1a55c.firebaseapp.com",
  databaseURL: "https://crown-db-1a55c.firebaseio.com",
  projectId: "crown-db-1a55c",
  storageBucket: "",
  messagingSenderId: "831546562547",
  appId: "1:831546562547:web:4383bd87985c5897"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;