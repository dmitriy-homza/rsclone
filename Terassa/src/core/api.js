/* eslint-disable */

import firebase from './firebase';

const saveData = (key, data) => {
  const isLoggedIn = !!firebase.auth().currentUser;
  if (isLoggedIn) {
    const db = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const userDataRef = db.ref(`users/${userId}/orders/`);
    userDataRef.child(key).set(data);
    const busyTable = firebase.database().ref(`busyTables`);
    busyTable.child(`${new Date(data.visit).getDate()}-${new Date(data.visit).getMonth()}-${new Date(data.visit).getFullYear()}`).push(data.tables)
  }
  else {
    const db = firebase.database();
    const userDataRef = db.ref(`anonOrders`);

    userDataRef.child(key).set(data);
  }
};

export { saveData };
