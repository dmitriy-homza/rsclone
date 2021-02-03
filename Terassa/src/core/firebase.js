/* eslint-disable */
import fb from 'firebase/app';
// import 'firebase/database';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: 'https://terassa-project-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: process.env.PROJECT_ID,
  storageBucket: 'terassa-project.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();
