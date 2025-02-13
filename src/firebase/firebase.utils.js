import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "API-KEY-HERE",
  authDomain: "YOUR-DOMAIN.firebaseapp.com",
  databaseURL: "https://YOUR-DOMAIN.firebaseio.com",
  projectId: "YOUR-DOMAIN",
  storageBucket: "YOUR-DOMAIN.appspot.com",
  messagingSenderId: "740933472539",
  appId: "1:740933472539:web:e44cc96677fa8d531043be",
  measurementId: "G-P3TC9XLKG7"
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
