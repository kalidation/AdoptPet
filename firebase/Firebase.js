import { firebaseConfig } from './config';
import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
