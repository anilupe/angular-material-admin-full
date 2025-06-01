import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBJaqpskN73PIU5ck0_XP_nam522QlrRcY',
  authDomain: 'mystique-med.firebaseapp.com',
  projectId: 'mystique-med',
  storageBucket: 'mystique-med.appspot.com',
  messagingSenderId: '426318179870',
  appId: '1:426318179870:web:9e98a82989b1d020aec80f',
  measurementId: 'G-ZQZP4BPGL7',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getDatabase(app);

export { app, analytics, auth, firestore, db };
