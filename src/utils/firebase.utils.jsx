// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

// The following function we used to once upload a js-data-file to
// the firebase database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // we first create a new reference to a collection on firebase
  // if this collection does not exist, firebase will create the reference anyway
  const collectionRef = collection(db, collectionKey);

  // We create a new batch which is a transaction
  const batch = writeBatch(db);

  // for each object to add we will...
  objectsToAdd.forEach((object) => {
    //... create a new doc (remember, if it doesn't exist, it will created anyway)
    // in our collection for each Element with a title (which is the Categories)
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // we add the entire object into the given document
    batch.set(docRef, object);
  });

  // when everything worked so far, let's commit the batch (which will be async)
  await batch.commit();
};

// the following function retrieves all our product data from the firebase database
export const getCategoriesAndDcouments = async () => {
  const collectionRef = collection(db, 'categories');

  // this will give us a snapshot of the collection
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  // We call the current value for reduce 'docSnapShot'
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    // we destructure off the title and the items of the current docSnaphot
    const { title, items } = docSnapshot.data();
    // the acc on position [title] is set to the items
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

// we can pass 'additional information' as an optional parameter (since we don't enforce
// it has to be there) ... -> see below
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

export const signOutCurrentUser = async () => await signOut(auth);

// This is a permanently open listener, which triggers the callback function
// every time 'auth' changes
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
