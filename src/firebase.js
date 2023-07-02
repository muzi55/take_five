import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDU4ItK1HuhefRIVbHSIn9fr53jFbfOPVw',
  authDomain: 'newsfeed-4dc7e.firebaseapp.com',
  projectId: 'newsfeed-4dc7e',
  storageBucket: 'newsfeed-4dc7e.appspot.com',
  messagingSenderId: '64535365589',
  appId: '1:64535365589:web:bc3ec1ddb805a581b29f5c',
};

//
// apiKey: "AIzaSyDU4ItK1HuhefRIVbHSIn9fr53jFbfOPVw",
// authDomain: "newsfeed-4dc7e.firebaseapp.com",
// projectId: "newsfeed-4dc7e",
// storageBucket: "newsfeed-4dc7e.appspot.com",
// messagingSenderId: "64535365589",
// appId: "1:64535365589:web:bc3ec1ddb805a581b29f5c"
//
// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
//   projectId: `${process.env.REACT_APP_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_APP_ID}`,
//   measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
