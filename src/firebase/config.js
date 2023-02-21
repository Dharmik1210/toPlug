import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGwMhdZnCQgh9rivT8IypUkO22Ad_N33E',
  authDomain: 'to-plug.firebaseapp.com',
  projectId: 'to-plug',
  storageBucket: 'to-plug.appspot.com',
  messagingSenderId: '498692579305',
  appId: '1:498692579305:web:a069fff3140e3d2013f578',
  measurementId: 'G-ZBHS32M7XS',
};

//intialiazing firebase
firebase.initializeApp(firebaseConfig);

//services inializing
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
