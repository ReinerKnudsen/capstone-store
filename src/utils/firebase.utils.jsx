// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBJJiLwzw3sd95NgAZ68oMtS2xLCtylmB8',
  authDomain: 'capstone-panda.firebaseapp.com',
  projectId: 'capstone-panda',
  storageBucket: 'capstone-panda.appspot.com',
  messagingSenderId: '91664778214',
  appId: '1:91664778214:web:d2602e067cbc31a24b4c27',
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// we can pass 'additional information' as an optional parameter (since we don't enforce
// that is has to be there) ... -> see below
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // --> now we spread in the additional information object.
        // Say 'displayName' does not exist in userAuth (that is when we sign up with email and
        // password) we pass it as additional information and spread it in here
        ...additionalInformation,
      });
    } catch (error) {
      console.log('An error occured creating a new user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInExistingUser = async (email, password) => {
  if (!email || !password) return;
  const userData = await signInWithEmailAndPassword(auth, email, password);
  return userData;
};
