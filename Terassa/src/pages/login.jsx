/* eslint-disable */

import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
// import { firebase } from '../core/firebase';
import { auth } from '../core/firebase';
import 'firebase/database';
import 'firebase/auth';
import { API } from '../core/constants';
import Layout from '../components/layout';
import Card from '../components/additional/card';

import '../styles/index.scss';

// Configure FirebaseUI.

export default class login extends Component {
  state = {
    hasAccount: false,
    dishes: [],
    uiConfig: null,
  };

  componentDidMount() {
    console.log('firebase ', firebase);
    this.setState({
      uiConfig: {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          auth.GoogleAuthProvider.PROVIDER_ID,
          auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false,
        },
      },
    });
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ hasAccount: true });
        // this.loadData(user);
      } else {
        this.setState({ hasAccount: false });
      }
    });
  }

  // loadData = (user) => {
  //   const db = firebase.database();
  //   const userId = user.uid;
  //   const userDataRef = db.ref(userId);

  //   // userDataRef.on('value', (data) => {
  //   //   const userData = data.val();
  //   //   if (userData) {
  //   //     this.setState({ dishes: userData[API.ADDITIONALS][API.DISHES] });
  //   //   }
  //   // });
  // };

  // renderDish = (dish) => (
  //   <Card
  //     key={`key${dish.name}`}
  //     name={dish.name}
  //     weight={dish.weight}
  //     img={dish.img}
  //     description={dish.description}
  //     cost={dish.cost}
  //   />
  // );

  // renderDishes = () => this.state.dishes.map(this.renderDish);

  render() {
    const { hasAccount, uiConfig } = this.state;
    if (!uiConfig) {
      return <p>Loading...</p>;
    }
    return (
      <Layout>
        {hasAccount ? (
          <div id="signed-In">
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
          </div>
        ) : (
          <div id="signed-out">
            <h2>Login:</h2>
            <p>Please sign-in:</p>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        )}
        <Helmet title="Terassa - Login" />
      </Layout>
    );
  }
}
