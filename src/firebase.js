import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDtQu5V4APITocvIdaNRtZDoNg9s5FK_r8',
  authDomain: 'editprofile-58d81.firebaseapp.com',
  projectId: 'editprofile-58d81',
  storageBucket: 'editprofile-58d81.appspot.com',
  messagingSenderId: '629045443054',
  appId: '1:629045443054:web:a6e363aec8e6c8714636ff',
  measurementId: 'G-8FQPEHX094',
};
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
