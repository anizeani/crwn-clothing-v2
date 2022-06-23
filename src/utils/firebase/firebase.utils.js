import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// eslint-disable-next-line
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {

  apiKey: "AIzaSyBGggOtEylAN1t83EWhJlAP4TDW1dWsmHY",

  authDomain: "crwn-clothing-db-ace3c.firebaseapp.com",

  projectId: "crwn-clothing-db-ace3c",

  storageBucket: "crwn-clothing-db-ace3c.appspot.com",

  messagingSenderId: "751335546783",

  appId: "1:751335546783:web:00cec99c44898a2e4ae7aa",

  measurementId: "G-BWHCLGRMLT"

};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({
   prompt: "select_account" 
});
fbProvider.setCustomParameters({
    prompt: "select_account" 
 });
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebookPopup = () => signInWithPopup(auth, fbProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data does not exists
    //create / set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName, 
          email, 
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error);
      }
    }
    return userDocRef;
    //if user data exists   
    //return userDocRef
};