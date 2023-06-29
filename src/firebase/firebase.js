// // firebase.js
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC_y2VohgGeFuYNrNHZPQ-ifgBXc2R6-Yg',
//   authDomain: 'muzimuzi5-52278.firebaseapp.com',
//   projectId: 'muzimuzi5-52278',
//   storageBucket: 'muzimuzi5-52278.appspot.com',
//   messagingSenderId: '89196268054',
//   appId: '1:89196268054:web:dd6fd9f44a3dcf2271c337',
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

//
//
//

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDU4ItK1HuhefRIVbHSIn9fr53jFbfOPVw',
  authDomain: 'newsfeed-4dc7e.firebaseapp.com',
  projectId: 'newsfeed-4dc7e',
  storageBucket: 'newsfeed-4dc7e.appspot.com',
  messagingSenderId: '64535365589',
  appId: '1:64535365589:web:bc3ec1ddb805a581b29f5c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const db = getFirestore(app);
