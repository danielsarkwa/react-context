import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB-oHMEDvkF7pYyuzkD-D_5-Cd2UE9oqWY",
  authDomain: "crwn-clothing-2-8eab9.firebaseapp.com",
  databaseURL: "https://crwn-clothing-2-8eab9.firebaseio.com",
  projectId: "crwn-clothing-2-8eab9",
  storageBucket: "crwn-clothing-2-8eab9.appspot.com",
  messagingSenderId: "1039117064450",
  appId: "1:1039117064450:web:52756e7a99832f052a4a1b"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
