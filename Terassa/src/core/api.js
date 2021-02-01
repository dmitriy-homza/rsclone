/* eslint-disable */

import firebase from './firebase';

const saveData = (key, data) => {
  const isLoggedIn = !!firebase.auth().currentUser;
  if (isLoggedIn) {
    const db = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const userDataRef = db.ref(`users/${userId}/orders/`);

    userDataRef.child(key).set(data);
  }
};

export { saveData };
